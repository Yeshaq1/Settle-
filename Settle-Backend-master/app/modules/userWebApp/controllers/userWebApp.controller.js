const userWebAppRepo = require('userWebApp/repositories/userWebApp.repository');
const roleRepo = require('role/repositories/role.repository');
const User = require('user/models/user.model');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const fs = require('fs');
const errorHandler = require('../../../errorHandler');
const mongoose = require('mongoose')
const gm = require('gm').subClass({
    imageMagick: true
});

class userWebAppController {

    /* @Method: insert
    // @Description: save userWebApp action
    */
    async insert(req, res) {
        try {
            var chkData = {
                isDeleted: false,
                email: req.body.email
            };
            let checkRes = await userWebAppRepo.getByField(chkData);
            if (!_.isEmpty(checkRes)) {
                req.flash('error', "User email already exist.");
                res.redirect(namedRouter.urlFor('userWebApp.create'));
            }
            else {

                if (req.files.length > 0) {
                    for (let i = 0; i < req.files.length; i++) {
                        if (req.files[i].fieldname == "profile_image") {
                            gm('./public/uploads/userWebApp/' + req.files[i].filename).resize(200, 200, '!').write('./public/uploads/userWebApp/thumb/' + req.files[i].filename, function (err, result) {
                                if (!err) console.log('done');
                            });
                            req.body.profile_image = req.files[i].filename
                        }
                    }
                }



                let user = new User();
                req.body.password = user.generateHash(req.body.password);
                let roleDetails = await roleRepo.getByField({ role: "user" });
                req.body.role = roleDetails._id

                let newUserWebApps = await userWebAppRepo.save(req.body);

                req.flash('success', 'User created successfully.');
                res.redirect(namedRouter.urlFor('userWebApp.list'));

            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('userWebApp.create'));
        }
    };


    /* @Method: update
    // @Description: userWebApp update action
    */
    async update(req, res) {
        try {
            const userWebAppId = req.body.pid;

            var chkData = {
                isDeleted: false,
                email: req.body.email,
                _id: { $ne: mongoose.Types.ObjectId(userWebAppId) }
            };
            let checkRes = await userWebAppRepo.getByField(chkData);
            if (!_.isEmpty(checkRes)) {
                req.flash('error', "User email already exist.");
                res.redirect(namedRouter.urlFor('userWebApp.edit', {
                    id: userWebAppId
                }));
            }
            else {

                let userWebAppValue = await userWebAppRepo.getById(userWebAppId);
                if (req.files.length > 0) {
                    for (let i = 0; i < req.files.length; i++) {
                        if (req.files[i].fieldname == "profile_image") {
                            if (fs.existsSync('./public/uploads/user/' + userWebAppValue.profile_image) && userWebAppValue.profile_image != '') {
                                fs.unlinkSync('./public/uploads/user/' + userWebAppValue.profile_image);
                            }
                            gm('./public/uploads/userWebApp/' + req.files[i].filename).resize(200, 200, '!').write('./public/uploads/userWebApp/thumb/' + req.files[i].filename, function (err, result) {
                                if (!err) console.log('done');
                            });
                            req.body.profile_image = req.files[i].filename
                        }
                    }
                }




                let userWebAppUpdate = await userWebAppRepo.updateById(req.body, userWebAppId);
                if (userWebAppUpdate) {
                    req.flash('success', "User Updated Successfully");
                    res.redirect(namedRouter.urlFor('userWebApp.list'));
                } else {
                    res.redirect(namedRouter.urlFor('userWebApp.edit', {
                        id: userWebAppId
                    }));
                }
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('userWebApp.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the userWebApp from DB
    */
    async list(req, res) {
        try {
            //  console.log("ok");
            res.render('userWebApp/views/list.ejs', {
                page_name: 'userWebApp-management',
                page_title: 'User List',
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the userWebApp from DB
    */
    async getAll(req, res) {
        try {

            let roleDetails = await roleRepo.getByField({ role: "user" });
            req.body.role = roleDetails._id

            let userWebApps = await userWebAppRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": userWebApps.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": userWebApps.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: userWebApps.data,
                message: `Data fetched successfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create userWebApp action
    */
    async create(req, res) {
        try {
            res.render('userWebApp/views/add.ejs', {
                page_name: 'userWebApp-management',
                page_title: 'User Create',
                user: req.user
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  userWebApp edit page
    */
    async edit(req, res) {
        try {
            let userWebAppValue = await userWebAppRepo.getById(req.params.id);
            if (!_.isEmpty(userWebAppValue)) {
                res.render('userWebApp/views/edit.ejs', {
                    page_name: 'userWebApp-management',
                    page_title: 'User Edit',
                    user: req.user,
                    response: userWebAppValue
                });
            }
            else {
                req.flash('error', "Sorry, User not found!");
                res.redirect(namedRouter.urlFor('userWebApp.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    /* @Method: delete
    // @Description: userWebApp delete
    */
    async delete(req, res) {
        try {
            let userWebAppDelete = await userWebAppRepo.updateById({ "isDeleted": true }, req.params.id);
            req.flash('success', 'User removed successfully');
            res.redirect(namedRouter.urlFor('userWebApp.list'));
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    async userWebAppImgDelete(req, res) {
        try {
            // console.log(req.params);
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
                    req.flash('success', "Image deleted sucessfully!");
                    res.redirect(namedRouter.urlFor('userWebApp.edit', {
                        id: req.params.id
                    }));
                }
            }
        } catch (e) {
            return {
                status: 500,
                data: [],
                message: e.message
            };
        }
    };

    /*
    // @Method: statusChange
    // @Description: userWebApp status change action
    */
    async statusChange(req, res) {
        try {
            let userWebApp = await userWebAppRepo.getById(req.params.id);
            if (!_.isEmpty(userWebApp)) {
                let userWebAppStatus = (userWebApp.isActive == true) ? false : true;
                let userWebAppUpdate = userWebAppRepo.updateById({ 'isActive': userWebAppStatus }, req.params.id);
                req.flash('success', "User status has changed successfully");
                res.redirect(namedRouter.urlFor('userWebApp.list'));
            }
            else {
                req.flash('error', 'User not found');
                res.redirect(namedRouter.urlFor('userWebApp.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new userWebAppController();