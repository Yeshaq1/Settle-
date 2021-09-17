const mongoose = require("mongoose");
const userWebAppRepo = require("userWebApp/repositories/userWebApp.repository");
const roleRepo = require("role/repositories/role.repository");
const userModel = require("user/models/user.model.js");
const smsClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const express = require("express");
const routeLabel = require("route-label");
const helper = require("../../helper/helper.js");
const mailer = require("../../helper/mailer.js");
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require("querystring");
const gm = require("gm").subClass({
  imageMagick: true
});
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.jwtSecret);
const User = new userModel();
var uniqid = require("uniqid");
const Axios = require("axios");
//mail send
const { join } = require("path");
const ejs = require("ejs");
const { readFile } = require("fs");
const { promisify } = require("util");
var moment = require('moment');
const { FieldValueInstance } = require("twilio/lib/rest/preview/understand/assistant/fieldType/fieldValue");
const readFileAsync = promisify(readFile);




class userWebAppController {
  constructor() { }


  /* @Method: login
  // @Description: Job Seeker/Employeer Login
  */
  async signup(req, res) {
    try {
      let userData = await userWebAppRepo.getByFieldWithRole({
        $or: [{ email: req.body.email }, { phone: req.body.phone }],
        isDeleted: false
      });
      console.log(userData)
      if (_.isEmpty(userData)) {

        let roleDetails = await roleRepo.getByField({ role: "user" });
        req.body.role = roleDetails._id

        let otp = Math.floor(Math.random() * (999999 - 111110)) + 111111;

        let sendMessage = await smsClient.messages.create({
          from: process.env.TWILIO_FROM_NUMBER,
          to: req.body.phone,
          body: `Your security code for Settle web app is ${otp}`
        });
        // console.log(sendMessage)
        if (sendMessage) {

          let newUserWebApps = await userWebAppRepo.save(req.body);
          if (newUserWebApps) {


            let updateUser = await userWebAppRepo.updateById({ mobileVerificationCode: otp, isMobileVerified: false }, newUserWebApps._id);

            return {
              status: 200,
              data: newUserWebApps,
              message: "Registered successfully."
            };
          }
          else {
            return {
              status: 201,
              data: [],
              message: "Something went worng."
            };
          }
        }

        else {
          return {
            status: 201,
            data: [],
            message: "Something went wrong."
          };
        }

      } else {
        return {
          status: 201,
          data: {},
          loggedIn: false,
          message: "Email/Phone no. already exists."
        };
      }
    } catch (e) {
      return { status: 500, data: {}, message: e.message };
    }
  }


  /* @Method: login
  // @Description: Job Seeker/Employeer Login
  */
  async login(req, res) {
    try {
      var obj = { isDeleted: false }
      if (req.body.email) {
        Object.assign(obj, { email: req.body.email })
      }
      if (req.body.phone) {
        Object.assign(obj, { phone: req.body.phone })
      }
      let userData = await userWebAppRepo.getByFieldWithRole(obj);
      console.log(userData)
      if (userData) {
        if (userData.role.role == "user") {
          if (userData.isActive) {
            //send otp phone
            let otp = Math.floor(Math.random() * (999999 - 111110)) + 111111;
            let updateUser = await userWebAppRepo.updateById({ loggedInToken: otp }, userData._id);
            if (req.body.phone && req.body.phone != "") {
              var sendMessage = await smsClient.messages.create({
                from: process.env.TWILIO_FROM_NUMBER,
                to: req.body.phone,
                body: `Your security code for Settle web app is ${otp}`
              });
              console.log(sendMessage)
            }
            //end
            //send otp email
            if (req.body.email && req.body.email != "") {
              let locals = {
                full_name: userData.first_name + " " + userData.last_name,
                body: `Your security code for Settle web app is ${otp}`,
                site_title: 'Settle' //settingObj.Site_Title
              };
              var isMailSend = await mailer.sendMail(`Admin<${process.env.MAIL_USERNAME}>`, req.body.email, 'Verification Code', 'login-otp-email', locals);
            }
            if (isMailSend || sendMessage) {
              return {
                status: 200,
                data: {},
                "message": 'A 6 digit verification code has been sent to your email/phone.'
              };
            }
            else {
              return {
                status: 201,
                data: {},
                message: "Somethig went wrong."
              };

            }
            //end

          } else {
            return {
              status: 201,
              data: {},
              loggedIn: false,
              message: "Your account is not active."
            };
          }
        } else {
          return {
            status: 201,
            data: {},
            loggedIn: false,
            message: "You are not a valid user."
          };
        }
      } else {
        return {
          status: 201,
          data: {},
          loggedIn: false,
          message: "No user found."
        };
      }
    } catch (e) {
      return { status: 500, data: {}, message: e.message };
    }
  }
  //
  async vefifyLoginCode(req, res) {
    try {
      var obj = { isDeleted: false }
      if (req.body.email) {
        Object.assign(obj, { email: req.body.email })
      }
      if (req.body.phone) {
        Object.assign(obj, { phone: req.body.phone })
      }
      let userData = await userWebAppRepo.getByFieldWithRole(obj);
      if (!_.isEmpty(userData)) {
        if (userData.isLoggedIn == false) {
          if (userData.loggedInToken != "") {
            if (req.body.code == userData.loggedInToken) {
              let updateUser = await userWebAppRepo.updateById({ isLoggedIn: true }, userData._id);
              const payload = { id: updateUser._id };
              const token = jwt.sign(payload, config.jwtSecret, {
                expiresIn: 86400
              });
              return {
                status: 200,
                loggedIn: true,
                token: token,
                data: updateUser,
                user_type: userData.role.role,
                message: "You have successfully logged in."
              };
            }
            else {
              return {
                status: 201,
                data: {},
                loggedIn: false,
                message: "Invalid OTP."
              };
            }
          }
          else {
            return {
              status: 201,
              data: {},
              loggedIn: false,
              message: "Please send OTP first."
            };
          }
        }
        else {
          const payload = { id: userData._id };
          const token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: 86400
          });
          return {
            status: 200,
            loggedIn: true,
            token: token,
            data: userData,
            user_type: userData.role.role,
            message: "You have successfully logged in."
          };
        }

      }
      else {
        return {
          status: 201,
          data: {},
          loggedIn: false,
          message: "No user found."
        };
      }

    }
    catch (e) {
      return { status: 500, data: {}, message: e.message };
    }
  }


  async vefifyPhone(req, res) {
    try {
      var obj = { isDeleted: false }
      if (req.body.phone) {
        Object.assign(obj, { phone: req.body.phone })
      }
      let userData = await userWebAppRepo.getByFieldWithRole(obj);
      if (!_.isEmpty(userData)) {
        if (userData.isMobileVerified == false) {
          if (req.body.code == userData.mobileVerificationCode) {

            let updateUser = await userWebAppRepo.updateById({ isMobileVerified: true }, userData._id);
            return {
              status: 200,
              data: updateUser,
              user_type: userData.role.role,
              message: "This phone number has been verified successfully."
            };
          }
          else {
            return {
              status: 201,
              data: [],
              message: "Invalid Code."
            };
          }
        }
        else {
          return {
            status: 201,
            data: userData,
            user_type: userData.role.role,
            message: "This phone number has been verified already."
          };
        }

      }
      else {
        return {
          status: 201,
          data: {},
          loggedIn: false,
          message: "No user found."
        };
      }

    }
    catch (e) {
      return { status: 500, data: {}, message: e.message };
    }
  }


  /* @Method: forgotPassword
   // @Description: Password resent mail will be sent
   */
  //
  async forgotPassword(req, res) {
    try {
      let userWebAppDtata = await userWebAppRepo.getByField({
        "email": req.body.email,
      });
      if (userWebAppDtata) {
        var d = new Date();
        var obj = { id: userWebAppDtata._id, date: d }
        let code = cryptr.encrypt(JSON.stringify(obj));

        let locals = {
          userWebApp_name: userWebAppDtata.userWebApp_name,
          password_reset_link: `${process.env.RESET_PASSWORD_LINK}/` + code,
          site_title: 'Settle' //settingObj.Site_Title
        };
        let isMailSend = await mailer.sendMail(`Admin<${process.env.MAIL_USERNAME}>`, req.body.email, 'Reset Password Link', 'reset-password-email', locals);
        if (isMailSend) {
          return {
            status: 200,
            data: {},
            "message": 'A reset password link has been sent to your email.'
          };
        }
        else {
          return {
            status: 201,
            data: {},
            message: "Somethig went wrong."
          };

        }

      }
      else {
        return {
          status: 201,
          data: [],
          message: 'Email is not registered yet.'
        };
      }
    } catch (error) {
      return {
        status: 500,
        data: [],
        message: error.message
      };
    }

  };
  /* @Method: emailVerification
   // @Description: Will verify the mail
   */
  //
  async emailVerification(req) {
    try {
      let userWebApp_id = cryptr.decrypt(req.params.code);
      let userWebAppDtata = await userWebAppRepo.getByField({
        _id: userWebApp_id,
        verificationCode: req.params.code
      });

      if (userWebAppDtata) {
        let updateData = await userWebAppRepo.updateById({
          verificationCode: "",
          isVerified: true
        },
          userWebAppDtata._id
        );
        return {
          status: 200,
          data: [],
          message: "Email Verified Successfully"
        };
      } else {
        return {
          status: 500,
          data: [],
          message: "Invalid Request, make sure you clicked on the right Link"
        };
      }
    } catch (error) {
      return {
        status: 500,
        data: [],
        message: error.message
      };
    }
  }

  /* @Method: sendVerificationEmail
   // @Description: Will send verification email
   */
  //
  async sendVerificationEmail(req) {
    try {
      let userWebAppDtata = await userWebAppRepo.getByField({
        "email": req.body.email,
        "isVerified": false
      });
      if (userWebAppDtata) {
        let code = cryptr.encrypt(userWebAppDtata._id);
        let updateData = await userWebAppRepo.updateById({
          verificationCode: code,
        },
          userWebAppDtata._id
        );
        if (updateData) {
          let locals = {
            fullname: userWebAppDtata.first_name + " " + userWebAppDtata.last_name,
            verification_link: `${process.env.MAIL_VERIFY_LINK}/` + code,
            site_title: 'AllFive' //settingObj.Site_Title
          };
          let isMailSend = await mailer.sendMail(`Admin<${process.env.MAIL_USERNAME}>`, req.body.email, 'Verification Link', 'verify-email', locals);
          if (isMailSend) {
            return {
              status: 200,
              data: {},
              "message": 'A verification link has been sent to your email.'
            };
          }
          else {
            return {
              status: 201,
              data: {},
              message: "Somethig went wrong."
            };

          }
        }
        else {
          return {
            status: 201,
            data: [],
            message: 'Somethig went wrong.'
          };
        }
      }
      else {
        return {
          status: 201,
          data: [],
          message: 'Either email is not registered or email is already verified.'
        };
      }
    } catch (error) {
      return {
        status: 500,
        data: [],
        message: error.message
      };
    }
  }
  //
  /* @Method: resetPassword
  // @Description: Will reset the password
  */
  //
  async resetPassword(req, res) {
    try {
      var d = new Date();
      var obj = JSON.parse(cryptr.decrypt(req.params.code));
      let userWebApp_id = obj.id;
      var c1 = moment(d).subtract(3, 'days');
      var c0 = moment(obj.date)
      if (c0 > c1) {
        let userWebAppDtata = await userWebAppRepo.getById(userWebApp_id);
        if (!_.isEmpty(userWebAppDtata) && userWebAppDtata.isActive == true && userWebAppDtata.isDeleted == false) {
          let newPassword = userWebAppDtata.generateHash(req.body.password);
          let updatedUser = await userWebAppRepo.updateById({ password: newPassword }, userWebApp_id);
          if (updatedUser) {
            return { status: 200, data: updatedUser, message: 'Password Changed Successfully.' }
          }
        }
        else {
          return { status: 201, data: [], message: 'User not Found.' };
        }
      }
      else {
        return { status: 201, data: [], message: 'Your password reset link has been expired.' };
      }
    }
    catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }
  //
  /* @Method: logout
  // @Description: logout action
  */
  //
  async logout(req, res) {
    try {
      var userWebApp_id = req.user._id;
      const result = await userWebAppRepo.getById(userWebApp_id);
      if (!_.isEmpty(result)) {

        var updateObj = { "deviceToken": "", "deviceType": "", "loggedInToken": "", "isLoggedIn": false };
        const updatedObj = await userWebAppRepo.updateById(updateObj, userWebApp_id);

        var payload = { id: userWebApp_id };

        const token = jwt.sign(payload, config.jwtSecret, {
          expiresIn: 0
        });

        return { status: 200, data: [], isLoggedIn: false, "message": 'Logout successfully' };
      }
      else {
        return { status: 201, data: [], "message": 'No user found' };
      }
    }
    catch (e) {
      return res.status(500).send({ "message": e.message });
    }
  }
  //
  /* @Method: getMyProfile
  // @Description: Get Profile from DB
  */
  // 
  async getMyProfile(req) {
    try {
      console.log(req.user)
      const user = await userWebAppRepo.getById(req.user._id);
      if (!_.isEmpty(user)) {

        return { status: 200, data: user, message: 'Profile Info fetched Successfully' };
      }
      else {
        return { status: 201, data: [], message: 'User not found' };
      }
    }
    catch (e) {
      return { status: 500, data: [], message: e.message };
    }
  }
  //
  /* @Method: updateProfile
  // @Description: Update Profile to DB
  */
  // 
  async updateProfile(req) {
    try {

      var chkData = {
        isDeleted: false,
        $or: [{ email: req.body.email }, { phone: req.body.phone }],
        _id: { $ne: mongoose.Types.ObjectId(req.user._id) }
      };
      console.log(chkData)
      let checkRes = await userWebAppRepo.getByField(chkData);
      console.log(checkRes)
      if (!_.isEmpty(checkRes)) {
        return { status: 201, data: [], "message": "Restaurant email/phone already exist." };
      }
      else {

        const data = await userWebAppRepo.getById(req.user._id);
        if (!_.isEmpty(data)) {




          if (req.body.phone && req.body.phone != "") {
            let otp = Math.floor(Math.random() * (999999 - 111110)) + 111111;

            let sendMessage = await smsClient.messages.create({
              from: process.env.TWILIO_FROM_NUMBER,
              to: req.body.phone,
              body: `Your security code for Settle web app is ${otp}`
            });

            let updateUser = await userWebAppRepo.updateById({ mobileVerificationCode: otp, isMobileVerified: false }, data._id);

          }


          let userWebAppUpdate = await userWebAppRepo.updateById(req.body, data._id);

          if (userWebAppUpdate) {
            return { status: 200, data: userWebAppUpdate, "message": "Restaurant details updated successfully" };
          } else {
            return { status: 201, data: [], "message": "Something want wrong. Please try again later!" };
          }


        } else {
          return { status: 201, data: [], "message": "User not found" };
        }
      }
    }
    catch (e) {
      return res.status(500).send({ status: 500, message: e.message });
    }
  }



  async userWebAppImgDelete(req, res) {
    try {
      console.log(req.params);
      let photos = await userWebAppRepo.getByField({ '_id': req.params.id, 'userWebApp_photos': { $in: req.params.imagename } });
      if (!_.isEmpty(photos)) {
        let photosUpdate = await userWebAppRepo.updateById({ $pull: { userWebApp_photos: { $in: [req.params.imagename] } } }, photos._id);
        if (photosUpdate) {
          if (fs.existsSync('./public/uploads/userWebApp/' + req.params.imagename) && req.params.imagename != '') {
            fs.unlinkSync('./public/uploads/userWebApp/' + req.params.imagename);
          }
          if (fs.existsSync('./public/uploads/userWebApp/thumb/' + req.params.imagename) && req.params.imagename != '') {
            fs.unlinkSync('./public/uploads/userWebApp/thumb/' + req.params.imagename);
          }

          return { status: 200, data: photosUpdate, "message": "Image deleted sucessfully!" };
        }
      }
    } catch (e) {
      return res.status(500).send({ status: 500, message: e.message });
    }
  };

  //
  /* @Method: changePassword
  // @Description: Will change password
  */
  // 
  async changePassword(req, res) {
    try {
      let userWebAppDtata = await userWebAppRepo.getById(req.user._id);
      if (!_.isEmpty(userWebAppDtata) && userWebAppDtata.isActive == true && userWebAppDtata.isDeleted == false) {
        if (req.body.old_password != req.body.new_password) {
          if (userWebAppDtata.validPassword(req.body.old_password, userWebAppDtata.password)) {
            let newPassword = userWebAppDtata.generateHash(req.body.new_password);
            let updatedUser = await userWebAppRepo.updateById({ password: newPassword }, req.user._id);
            if (updatedUser) {
              return { status: 200, data: updatedUser, message: 'Password Changed Successfully.' }
            }
          }
          else {
            return { status: 201, data: [], message: 'You have entered Wrong Old Password.' };
          }
        }
        else {
          return { status: 201, data: [], message: 'Old Password and new password should not be same.' };
        }
      }
      else {
        return { status: 201, data: [], message: 'User not Found.' };
      }
    }
    catch (e) {
      return res.status(500).send({ message: e.message });
    }
  }
  //
  //

}

module.exports = new userWebAppController();
