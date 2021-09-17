const restaurantRepo = require('restaurant/repositories/restaurant.repository');
const tableRepo = require('table/repositories/table.repository');
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

class restaurantController {

    /* @Method: insert
    // @Description: save restaurant action
    */
    async insert(req, res) {
        try {
            var chkData = {
                isDeleted: false,
                email: req.body.email
            };
            let checkRes = await restaurantRepo.getByField(chkData);
            if (!_.isEmpty(checkRes)) {
                req.flash('error', "Restaurant email already exist.");
                res.redirect(namedRouter.urlFor('restaurant.create'));
            }
            else {
                let restaurant = []
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

                let user = new User();
                req.body.password = user.generateHash(req.body.password);
                let roleDetails = await roleRepo.getByField({ role: "restaurant" });
                req.body.role = roleDetails._id

                let newRestaurants = await restaurantRepo.save(req.body);

                req.flash('success', 'Restaurant created successfully.');
                res.redirect(namedRouter.urlFor('restaurant.list'));

            }
        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('restaurant.create'));
        }
    };


    /* @Method: update
    // @Description: restaurant update action
    */
    async update(req, res) {
        try {
            const restaurantId = req.body.pid;

            var chkData = {
                isDeleted: false,
                email: req.body.email,
                _id: { $ne: mongoose.Types.ObjectId(restaurantId) }
            };
            let checkRes = await restaurantRepo.getByField(chkData);
            if (!_.isEmpty(checkRes)) {
                req.flash('error', "Restaurant email already exist.");
                res.redirect(namedRouter.urlFor('restaurant.edit', {
                    id: restaurantId
                }));
            }
            else {

                let restaurantValue = await restaurantRepo.getById(restaurantId);
                let restaurant = restaurantValue.restaurant_photos
                if (req.files.length > 0) {
                    for (let i = 0; i < req.files.length; i++) {
                        if (req.files[i].fieldname == "restaurant_photos") {
                            gm('./public/uploads/restaurant/' + req.files[i].filename).resize(200, 200, '!').write('./public/uploads/restaurant/thumb/' + req.files[i].filename, function (err, result) {
                                if (!err) console.log('done');
                            });
                            restaurant.push(req.files[i].filename);
                        }
                        if (req.files[i].fieldname == "restaurant_menu_pdf") {
                            if (fs.existsSync('./public/uploads/restaurant/' + restaurantValue.restaurant_menu_pdf) && restaurantValue.restaurant_menu_pdf != '') {
                                fs.unlinkSync('./public/uploads/restaurant/' + restaurantValue.restaurant_menu_pdf);
                            }
                            req.body.restaurant_menu_pdf = req.files[i].filename
                        }
                    }
                }

                req.body.restaurant_photos = restaurant




                let restaurantUpdate = await restaurantRepo.updateById(req.body, restaurantId);
                if (restaurantUpdate) {
                    req.flash('success', "Restaurant Updated Successfully");
                    res.redirect(namedRouter.urlFor('restaurant.list'));
                } else {
                    res.redirect(namedRouter.urlFor('restaurant.edit', {
                        id: restaurantId
                    }));
                }
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('restaurant.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the restaurant from DB
    */
    async list(req, res) {
        try {

            res.render('restaurant/views/list.ejs', {
                page_name: 'restaurant-management',
                page_title: 'Restaurant List',
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the restaurant from DB
    */
    async getAll(req, res) {
        try {

            let roleDetails = await roleRepo.getByField({ role: "restaurant" });
            req.body.role = roleDetails._id

            let restaurants = await restaurantRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": restaurants.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": restaurants.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: restaurants.data,
                message: `Data fetched successfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create restaurant action
    */
    async create(req, res) {
        try {
            res.render('restaurant/views/add.ejs', {
                page_name: 'restaurant-management',
                page_title: 'Restaurant Create',
                user: req.user
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  restaurant edit page
    */
    async edit(req, res) {
        try {
            let restaurantValue = await restaurantRepo.getById(req.params.id);
            if (!_.isEmpty(restaurantValue)) {
                res.render('restaurant/views/edit.ejs', {
                    page_name: 'restaurant-management',
                    page_title: 'Restaurant Edit',
                    user: req.user,
                    response: restaurantValue
                });
            }
            else {
                req.flash('error', "Sorry, restaurant not found!");
                res.redirect(namedRouter.urlFor('restaurant.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    /* @Method: delete
    // @Description: restaurant delete
    */
    async delete(req, res) {
        try {

            let table = await tableRepo.getByField({ restaurant_id: mongoose.Types.ObjectId(req.params.id), isDeleted: false })
            if (_.isEmpty(table)) {
                let restaurantDelete = await restaurantRepo.updateById({ "isDeleted": true }, req.params.id);
                req.flash('success', 'Restaurant removed successfully');
                res.redirect(namedRouter.urlFor('restaurant.list'));
            } else {
                req.flash('error', 'Restaurant is used on table collection. Please delete its table first.');
                res.redirect(namedRouter.urlFor('restaurant.list'));
            }

        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    async restaurantImgDelete(req, res) {
        try {
            // console.log(req.params);
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
                    req.flash('success', "Image deleted sucessfully!");
                    res.redirect(namedRouter.urlFor('restaurant.edit', {
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
    // @Description: restaurant status change action
    */
    async statusChange(req, res) {
        try {
            let restaurant = await restaurantRepo.getById(req.params.id);
            if (!_.isEmpty(restaurant)) {
                let restaurantStatus = (restaurant.isActive == true) ? false : true;
                let restaurantUpdate = restaurantRepo.updateById({ 'isActive': restaurantStatus }, req.params.id);
                req.flash('success', "Restaurant status has changed successfully");
                res.redirect(namedRouter.urlFor('restaurant.list'));
            }
            else {
                req.flash('error', 'Restaurant not found');
                res.redirect(namedRouter.urlFor('restaurant.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new restaurantController();