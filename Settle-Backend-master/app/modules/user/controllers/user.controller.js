const mongoose = require('mongoose');
const User = require('user/models/user.model');
const userRepo = require('user/repositories/user.repository');
const roleRepo = require('role/repositories/role.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const gm = require('gm').subClass({
    imageMagick: true
});
const fs = require('fs');
const jwt = require('jsonwebtoken');
//mail send 
const { join } = require('path');
const ejs = require('ejs');
const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
var request = require('request');
const newUser = new User();


class UserController {
    constructor() {
        this.users = [];

    }

    /* @Method: notFoundPage
    // @Description: Page not found method and show 404 error
    */
    async notFoundPage(req, res) {
        try {
            res.render('user/views/error.ejs');
        } catch (e) {
            throw e;
        }
    }

    //*****Admin Method Section  Start*****

    /* @Method: login
    // @Description: user Login Render
    */
    async login(req, res) {

        res.render('user/views/login.ejs');
    };

    /* @Method: signin
    // @Description: user Login
    */
    async signin(req, res) {
        try {

            let userData = await userRepo.fineOneWithRole(req.body);
            if (userData.status == 500) {
                req.flash('error', userData.message);
                res.redirect('/');
                //return res.redirect(namedRouter.urlFor('user.login'));
            }
            let user = userData.data;
            if (!_.isEmpty(user)) {

                if (!_.isEmpty(user.role) && (user.role.role == 'admin')) {
                    const payload = {
                        id: user._id
                    };

                    let token = jwt.sign(payload, config.jwtSecret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    req.session.token = token;
                    req.user = user;
                    let user_details = {};
                    user_details.id = user._id;
                    user_details.name = user.name;
                    user_details.email = user.email;
                    // return the information including token as JSON
                    req.flash('success', "You have successfully logged in");
                    res.redirect(namedRouter.urlFor('user.dashboard'));
                } else {
                    req.flash('error', 'Authentication failed. You are not a valid user.');
                    res.redirect(namedRouter.urlFor('user.login'));
                }
            } else {
                req.flash('error', 'Authentication failed. You are not a valid user.');
                //res.redirect(namedRouter.urlFor('user.login'));
            }
        } catch (e) {
            throw e;
        }
    };


    /* @Method: Dashboard
    // @Description: User Dashboard
    */
    async dashboard(req, res) {

        try {
            let roleRes = await roleRepo.getByField({ role: "restaurant" });
            let roleUser = await roleRepo.getByField({ role: "user" });

            var dashCounts = {
                rescount: await userRepo.getUserCountByParam({ isDeleted: false, role: roleRes._id }),
                usercount: await userRepo.getUserCountByParam({ isDeleted: false, role: roleUser._id })
            }

            /* Html render here */
            res.render('user/views/dashboard.ejs', {
                page_name: 'user-dashboard',
                page_title: 'Dashboard',
                user: req.user,
                dashCounts: dashCounts

            });

        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };



    /* @Method: Logout
    // @Description: User Logout
    */
    async logout(req, res) {
        req.session.destroy(function (err) {
            //res.redirect('/' + process.env.ADMIN_FOLDER_NAME);
            res.redirect('/');
        });
        // req.session.token = "";
        // req.session.destroy();
        // return res.redirect('/');
    };

    /* @Method: viewmyprofile
    // @Description: To get Profile Info from db
    */
    async viewmyprofile(req, res) {
        try {
            const id = req.params.id;
            let user = await userRepo.getById(id)
            if (!_.isEmpty(user)) {
                res.render('user/views/myprofile.ejs', {
                    page_name: 'user-profile',
                    page_title: 'My Profile',
                    user: req.user,
                    response: user
                });

            }
        } catch (e) {

            return res.status(500).send({
                message: e.message
            });
        }
    }

    /* @Method: updateprofile
    // @Description: Update My Profile 
    */
    async updateprofile(req, res) {
        try {
            const id = req.body.id;
            let userData = await userRepo.getById(id)
            if (req.files.length > 0) {
                if (fs.existsSync('./public/uploads/user/' + userData.profile_image) && userData.profile_image != '') {
                    fs.unlinkSync('./public/uploads/user/' + userData.profile_image);
                }
                gm('./public/uploads/user/' + req.files[0].filename).resize(200, 200, '!').write('./public/uploads/user/thumb/' + req.files[0].filename, function (err, result) {
                    if (!err) console.log('done');
                });
                req.body.profile_image = req.files[0].filename;
            } else {
                req.body.profile_image = userData.profile_image;
            }
            let userUpdate = await userRepo.updateById(req.body, id)
            if (!_.isEmpty(userUpdate)) {
                req.flash('success', "Profile updated successfully.");
                res.redirect(namedRouter.urlFor('admin.profile', {
                    id: id
                }));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: changepassword
    // @Description: user changepassword Render
    */
    async adminChangePassword(req, res) {
        var user = await userRepo.getById(req.user._id);
        if (user) {
            res.render('user/views/change_password.ejs', {
                page_name: 'user-changepassword',
                page_title: 'Change Password',
                response: user,
                user: req.user
            });
        } else {
            req.flash('error', "sorry user not found.");
            res.redirect(namedRouter.urlFor('user.dashboard'));
        }

    };

    /*
    // @Method: updatepassword
    // @Description: User password change
    */

    async adminUpdatePassword(req, res) {
        try {
            let user = await userRepo.getById(req.user._id);
            if (!_.isEmpty(user)) {
                // check if password matches
                if (!newUser.validPassword(req.body.old_password, user.password)) {
                    req.flash('error', "Sorry old password mismatch!");
                    res.redirect(namedRouter.urlFor('admin.changepassword'));
                } else {
                    if (req.body.password == req.body.password_confirm) {
                        // if user is found and password is right, check if he is an admin
                        let new_password = req.user.generateHash(req.body.password);
                        let userUpdate = await userRepo.updateById({
                            "password": new_password
                        }, req.body.id);

                        if (userUpdate) {
                            req.flash('success', "Your password has been changed successfully.");
                            res.redirect(namedRouter.urlFor('user.dashboard'));
                        }
                    } else {
                        req.flash('error', "Your New Password And Confirm Password does not match.");
                        res.redirect(namedRouter.urlFor('admin.changepassword'));
                    }

                }
            } else {
                req.flash('error', "Authentication failed. Wrong credentials.");
                res.redirect(namedRouter.urlFor('admin.changepassword'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: forgotPassword
    // @Description: User forgotPassword
    */

    async forgotPassword(req, res) {
        try {
            let roleDetails = await roleRepo.getByField({ role: "admin" });
            let result = {};
            let user = await User.findOne({ email: req.body.email, role: mongoose.Types.ObjectId(roleDetails._id) }).exec();

            if (!user) {
                result.status = 500;
                return res.status(201).send({ "result": result, "message": "User not found", "status": false });
            }
            else {
                let random_pass = Math.random().toString(36).substr(2, 9);
                let readable_pass = random_pass;
                random_pass = user.generateHash(random_pass);
                let user_details = await User.findByIdAndUpdate(user._id, { password: random_pass }).exec();
                if (!user_details) {
                    result.status = 500;
                    return res.status(201).send({ "result": result, "message": "User not found", "status": false });
                }
                else {
                    var mailOptions = {
                        from: `AllFive Admin<${process.env.MAIL_USERNAME}>`,
                        to: req.body.email,
                        subject: "Forget Password",
                        html: 'Hello ' + '<b>' + user.email + '</b>' + ',<br><br>We have received a request to reset your password.<br><br>Here is your new password: <span><b>' + readable_pass + '</b></span><br><br>Thank You'
                    };
                    let sendMail = await transporter.sendMail(mailOptions);
                    if (sendMail) {
                        result.status = 200;
                        return res.status(200).send({ "result": result, "message": "Mail is sending to your mail id with new password", "status": false });
                    }
                }
            }
        }
        catch (e) {

            return res.status(500).send({ message: e.message });
        }
    };

    //*****Admin Method Section  End*****

    //----------------------------------**********--------------------------------------

    //*****Sub Admin section Start******

    /* @Method: createSubAdmin
   // @Description: Sub Admin create view render
   */
    async createSubAdmin(req, res) {
        try {
            res.render('user/views/add.ejs', {
                page_name: 'subadmin-management',
                page_title: 'Create Sub Admin',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: insertSubAdmin
    // @Description: save Sub Admin
    */
    async insertSubAdmin(req, res) {
        try {
            let roleDetails = await roleRepo.getByField({ role: "sub_admin" });
            if (!_.isEmpty(roleDetails)) {
                req.body.role = roleDetails._id;
            }
            req.body.password = newUser.generateHash(req.body.password);
            let checkEmail = await userRepo.getByField({ isDeleted: false, email: req.body.email });
            if (!_.isEmpty(checkEmail)) {
                req.flash('error', "Sorry, User already exist with this email.");
                res.redirect(namedRouter.urlFor('user.subadmin.create'));
            } else {
                let saveUser = await userRepo.save(req.body);
                if (saveUser) {
                    req.flash('success', 'User created succesfully.');
                    res.redirect(namedRouter.urlFor('user.subadmin.listing'));
                }
            }
        } catch (e) {

            req.flash('error', e.message);
            res.redirect(namedRouter.urlFor('user.subadmin.create'));
        }
    };

    /* @Method: subAdminlist
    // @Description: To get all the Sub Admin from DB
    */
    async subAdminlist(req, res) {
        try {
            res.render('user/views/list.ejs', {
                page_name: 'subadmin-management',
                page_title: 'Sub Admin List',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAllSubAdmin
    // @Description: To get all the Sub Admin from DB
    */
    async getAllSubAdmin(req, res) {
        try {
            req.body.role = 'sub_admin';

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }

            if (!_.has(req.body, 'pagination')) {
                req.body.pagination.page = 1;
                eq.body.pagination.perpage = config.PAGINATION_PERPAGE
            }
            let user = await userRepo.getAllUsers(req);
            let meta = {
                "page": req.body.pagination.page,
                "pages": user.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": user.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200, meta: meta, data: user.data, message: `Data fetched succesfully.`
            };
        } catch (e) {
            return { status: 500, data: [], message: e.message };
        }
    }

    /**
    * @Method: editSubAdmin
    * @Description: To edit SubAdmin information
    */
    async editSubAdmin(req, res) {
        try {
            let result = {};
            let userData = await userRepo.getById(req.params.id);
            if (!_.isEmpty(userData)) {
                result.user_data = userData;
                res.render('user/views/edit.ejs', {
                    page_name: 'subadmin-management',
                    page_title: 'Edit Sub Admin',
                    user: req.user,
                    response: result,
                });
            } else {
                req.flash('error', "Sorry user not found!");
                res.redirect(namedRouter.urlFor('user.subadmin.listing'));
            }
        } catch (e) {
            throw e;
        }
    };

    /* @Method: updateSubAdmin
    // @Description: Sub Admin Update
    */
    async updateSubAdmin(req, res) {
        try {
            let userData = await userRepo.getById(req.body.uid);
            var chkEmail = { 'isDeleted': false, 'email': req.body.email, '_id': { $ne: mongoose.Types.ObjectId(req.body.uid) } };

            let checkEmail = await userRepo.getByField(chkEmail);
            if (!_.isEmpty(checkEmail)) {
                req.flash('error', "Email already exist.");
                res.redirect(namedRouter.urlFor('user.subadmin.edit', {
                    id: req.body.uid
                }));
            }
            else {
                let userUpdate = userRepo.updateById(req.body, req.body.uid);
                if (userUpdate) {
                    req.flash('success', 'User updated succesfully.');
                    res.redirect(namedRouter.urlFor('user.subadmin.listing'));
                } else {
                    res.redirect(namedRouter.urlFor('user.subadmin.edit', { id: req.body.uid }));
                }
            }

        } catch (e) {
            throw e;
        }
    };

    /* @Method: deleteSubAdmin
    // @Description: Sub Admin Delete
    */
    async deleteSubAdmin(req, res) {
        try {
            let user = await userRepo.getById(req.params.id);
            if (!_.isEmpty(user)) {
                let userDelete = await userRepo.updateById({
                    "isDeleted": true
                }, user._id)
                if (!_.isEmpty(userDelete)) {
                    req.flash('success', 'User Removed Successfully');
                    res.redirect(namedRouter.urlFor('user.subadmin.listing'));
                }
            } else {
                req.flash('error', "Sorry user not found");
                res.redirect(namedRouter.urlFor('user.subadmin.listing'));
            }
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /*
    // @Method: statusChangeSubAdmin
    // @Description: Sub Admin status change action
    */
    async statusChangeSubAdmin(req, res) {
        try {
            let user = await userRepo.getById(req.params.id);
            if (!_.isEmpty(user)) {
                let userStatus = (user.isActive == true) ? false : true;
                let userUpdate = await userRepo.updateById({
                    'isActive': userStatus
                }, req.params.id);
                if (!_.isEmpty(userUpdate)) {
                    req.flash('success', "User status has changed successfully.");
                    res.redirect(namedRouter.urlFor('user.subadmin.listing'));
                }
            } else {
                req.flash('error', "Sorry user not found");
                res.redirect(namedRouter.urlFor('user.subadmin.listing'));
            }
        } catch (e) {

            return res.status(500).send({
                message: e.message
            });
        }
    };

    //*****Sub Admin section End*****

    //----------------------------------**********--------------------------------------

}

module.exports = new UserController();