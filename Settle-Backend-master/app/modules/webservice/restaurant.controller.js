const mongoose = require("mongoose");
const restaurantRepo = require("restaurant/repositories/restaurant.repository");
const restaurant_ratingRepo = require('restaurant_rating/repositories/restaurant_rating.repository');
const dishes_ratingRepo = require('dishes_rating/repositories/dishes_rating.repository');
const tableRepo = require('table/repositories/table.repository');
const roleRepo = require("role/repositories/role.repository");
const userModel = require("user/models/user.model.js");
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
const readFileAsync = promisify(readFile);




class restaurantController {
  constructor() { }




  /* @Method: login
  // @Description: Job Seeker/Employeer Login
  */
  async loginRes(req, res) {
    try {
      console.log(req)
      let userData = await restaurantRepo.getByFieldWithRole({
        email: req.body.email,
        isDeleted: false
      });
      console.log(userData)
      if (userData) {
        if (userData.role.role == "restaurant") {
          if (userData.isActive) {
            if (!userData.validPassword(req.body.password, userData.password)) {
              return {
                status: 201,
                data: [],
                message: "Authentication failed, wrong password."
              };
            } else {

              if (
                _.has(req.body, "deviceToken") &&
                _.has(req.body, "deviceType")
              ) {
                var deviceToken = req.body.deviceToken;
                var deviceType = req.body.deviceType;
              }

              var updatedQuery = {
                deviceToken: req.body.deviceToken,
                deviceType: req.body.deviceType
              };
              var userUpdatedData = await restaurantRepo.updateById(
                updatedQuery,
                userData._id
              );

              const payload = { id: userData._id };
              const token = jwt.sign(payload, config.jwtSecret, {
                expiresIn: 86400
              });

              return {
                status: 200,
                token: token,
                loggedIn: true,
                data: userData,
                user_type: userData.role.role,
                message: "You have successfully logged in."
              };

            }
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


  /* @Method: forgotPassword
   // @Description: Password resent mail will be sent
   */
  //
  async forgotPassword(req, res) {
    try {
      let restaurantDtata = await restaurantRepo.getByField({
        "email": req.body.email,
      });
      if (restaurantDtata) {
        var d = new Date();
        var obj = { id: restaurantDtata._id, date: d }
        let code = cryptr.encrypt(JSON.stringify(obj));

        let locals = {
          restaurant_name: restaurantDtata.restaurant_name,
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
      let restaurant_id = cryptr.decrypt(req.params.code);
      let restaurantDtata = await restaurantRepo.getByField({
        _id: restaurant_id,
        verificationCode: req.params.code
      });

      if (restaurantDtata) {
        let updateData = await restaurantRepo.updateById({
          verificationCode: "",
          isVerified: true
        },
          restaurantDtata._id
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
      let restaurantDtata = await restaurantRepo.getByField({
        "email": req.body.email,
        "isVerified": false
      });
      if (restaurantDtata) {
        let code = cryptr.encrypt(restaurantDtata._id);
        let updateData = await restaurantRepo.updateById({
          verificationCode: code,
        },
          restaurantDtata._id
        );
        if (updateData) {
          let locals = {
            fullname: restaurantDtata.first_name + " " + restaurantDtata.last_name,
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
      let restaurant_id = obj.id;
      var c1 = moment(d).subtract(3, 'days');
      var c0 = moment(obj.date)
      if (c0 > c1) {
        let restaurantDtata = await restaurantRepo.getById(restaurant_id);
        if (!_.isEmpty(restaurantDtata) && restaurantDtata.isActive == true && restaurantDtata.isDeleted == false) {
          let newPassword = restaurantDtata.generateHash(req.body.password);
          let updatedUser = await restaurantRepo.updateById({ password: newPassword }, restaurant_id);
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
      var restaurant_id = req.user._id;
      const result = await restaurantRepo.getById(restaurant_id);
      if (!_.isEmpty(result)) {

        var updateObj = { "deviceToken": "", "deviceType": "" };
        const updatedObj = await restaurantRepo.updateById(updateObj, restaurant_id);

        var payload = { id: restaurant_id };

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
      const user = await restaurantRepo.getById(req.user._id);
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
  /* @Method: getFeedbacks
  // @Description: Get Feedbacks from DB
  */
  // 
  async getFeedbacks(req) {
    try {

      const user = await restaurantRepo.getByFieldWithRole({
        _id: mongoose.Types.ObjectId(req.user._id),
        isDeleted: false
      });

      if (!_.isEmpty(user) && user.role.role == "restaurant") {
        let restaurent_avgRating = await restaurant_ratingRepo.getAllByFieldRestaurentAPI(req)
        let restaurent_feedback_list = await restaurant_ratingRepo.getAllByFieldRestaurentAPI2(req)
        let rating_list_by_dishId = await dishes_ratingRepo.getAllByFieldRestaurentAPI(req)
        let dishes_feedback_list = await dishes_ratingRepo.getAllByFieldRestaurentAPI2(req)
        var avgRating_restaurent = []
        avgRating_restaurent.push({
          name: "avgFoodRating",
          rating: restaurent_avgRating[0].avgFoodRating,
        })
        avgRating_restaurent.push({
          name: "avgServiceRating",
          rating: restaurent_avgRating[0].avgServiceRating,
        })
        avgRating_restaurent.push({
          name: "avgAmbianceRating",
          rating: restaurent_avgRating[0].avgAmbianceRating,
        })
        var data = {
          "restaurent_feedback_list": restaurent_feedback_list,
          "avgRating_restaurent": avgRating_restaurent,//restaurent_avgRating,
          "dishes_feedback_list": dishes_feedback_list,
          "avgRating_list_by_dish": rating_list_by_dishId,
        }
        return { status: 200, data: data, message: 'Profile Info fetched Successfully' };
      }
      else {
        return { status: 201, data: [], message: 'User not found or is not a valid user.' };
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
        email: req.body.email,
        _id: { $ne: mongoose.Types.ObjectId(req.user._id) }
      };
      let checkRes = await restaurantRepo.getByField(chkData);
      if (!_.isEmpty(checkRes)) {
        return { status: 201, data: [], "message": "Restaurant email already exist." };
      }
      else {

        const data = await restaurantRepo.getById(req.user._id);
        if (!_.isEmpty(data)) {

          let restaurant = data.restaurant_photos
          if (req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
              if (req.files[i].fieldname == "restaurant_photos") {
                gm('./public/uploads/restaurant/' + req.files[i].filename).resize(200, 200, '!').write('./public/uploads/restaurant/thumb/' + req.files[i].filename, function (err, result) {
                  if (!err) console.log('done');
                });
                restaurant.push(req.files[i].filename);
              }
              if (req.files[i].fieldname == "restaurant_menu_pdf") {

                req.body.restaurant_menu_pdf = req.files[i].filename
              }
            }
          }

          req.body.restaurant_photos = restaurant

          let restaurantUpdate = await restaurantRepo.updateById(req.body, data._id);
          if (restaurantUpdate) {
            return { status: 200, data: restaurantUpdate, "message": "Restaurant details updated successfully" };
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

  async restaurantImgDelete(req, res) {
    try {
      console.log(req.params);
      let photos = await restaurantRepo.getByField({ '_id': req.params.id, 'restaurant_photos': { $in: req.params.imagename } });
      if (!_.isEmpty(photos)) {
        let photosUpdate = await restaurantRepo.updateById({ $pull: { restaurant_photos: { $in: [req.params.imagename] } } }, photos._id);
        if (photosUpdate) {
          if (fs.existsSync('./public/uploads/restaurant/' + req.params.imagename) && req.params.imagename != '') {
            fs.unlinkSync('./public/uploads/restaurant/' + req.params.imagename);
          }
          if (fs.existsSync('./public/uploads/restaurant/thumb/' + req.params.imagename) && req.params.imagename != '') {
            fs.unlinkSync('./public/uploads/restaurant/thumb/' + req.params.imagename);
          }

          return { status: 200, data: photosUpdate, "message": "Image deleted sucessfully!" };
        }
      }
    } catch (e) {
      return res.status(500).send({ status: 500, message: e.message });
    }
  };

  //get Table

  async restaurantGetTable(req, res) {
    try {
      console.log(req.params);
      let table = await tableRepo.getById(req.params.id);
      if (!_.isEmpty(table)) {
        let restaurantDtata = await restaurantRepo.getById(table.restaurant_id);
        var obj = {
          table: table,
          restaurant: restaurantDtata
        }
        return { status: 200, data: obj, "message": "Record fetched successfully." };
      }
      else {
        return { status: 200, data: {}, "message": "Table not found!" };
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
      let restaurantDtata = await restaurantRepo.getById(req.user._id);
      if (!_.isEmpty(restaurantDtata) && restaurantDtata.isActive == true && restaurantDtata.isDeleted == false) {
        if (req.body.old_password != req.body.new_password) {
          if (restaurantDtata.validPassword(req.body.old_password, restaurantDtata.password)) {
            let newPassword = restaurantDtata.generateHash(req.body.new_password);
            let updatedUser = await restaurantRepo.updateById({ password: newPassword }, req.user._id);
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

module.exports = new restaurantController();
