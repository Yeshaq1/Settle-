const restaurant_ratingRepo = require('restaurant_rating/repositories/restaurant_rating.repository');
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

class restaurant_ratingController {

    /* @Method: insert
    // @Description: save restaurant_rating action
    */
    async insert(req, res) {
        try {
            var chkData = {
                isDeleted: false,
                name: req.body.name
            };
            let checkCat = await restaurant_ratingRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Restaurant rating name already exist.");
                res.redirect(namedRouter.urlFor('restaurant_rating.create'));
            }
            else {
                // For restaurant_rating image //

                let newRestaurant_ratings = await restaurant_ratingRepo.save(req.body);
                req.flash('success', 'Restaurant_rating created successfully.');
                res.redirect(namedRouter.urlFor('restaurant_rating.list'));
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('restaurant_rating.create'));
        }
    };


    /* @Method: update
    // @Description: restaurant_rating update action
    */
    async update(req, res) {
        try {
            const restaurant_ratingId = req.body.pid;
            var chkData = {
                isDeleted: false,
                name: req.body.name,
                _id: { $ne: mongoose.Types.ObjectId(restaurant_ratingId) }
            };
            let checkCat = await restaurant_ratingRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Restaurant rating name already exist.");
                res.redirect(namedRouter.urlFor('restaurant_rating.edit', {
                    id: restaurant_ratingId
                }));
            }
            else {
                let restaurant_ratingValue = await restaurant_ratingRepo.getById(restaurant_ratingId);


                let restaurant_ratingUpdate = await restaurant_ratingRepo.updateById(req.body, restaurant_ratingId);
                if (restaurant_ratingUpdate) {
                    req.flash('success', "Restaurant rating Updated Successfully");
                    res.redirect(namedRouter.urlFor('restaurant_rating.list'));
                } else {
                    res.redirect(namedRouter.urlFor('restaurant_rating.edit', {
                        id: restaurant_ratingId
                    }));
                }
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('restaurant_rating.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the restaurant_rating from DB
    */
    async list(req, res) {
        try {

            res.render('restaurant_rating/views/list.ejs', {
                page_name: 'restaurant_rating-management',
                page_title: 'Restaurant_rating List',
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the restaurant_rating from DB
    */
    async getAll(req, res) {
        try {
            let restaurant_ratings = await restaurant_ratingRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": restaurant_ratings.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": restaurant_ratings.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: restaurant_ratings.data,
                message: `Data fetched successfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create restaurant_rating action
    */
    async create(req, res) {
        try {
            res.render('restaurant_rating/views/add.ejs', {
                page_name: 'restaurant_rating-management',
                page_title: 'Restaurant_rating Create',
                user: req.user
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  restaurant_rating edit page
    */
    async edit(req, res) {
        try {
            let restaurant_ratingValue = await restaurant_ratingRepo.getById(req.params.id);
            if (!_.isEmpty(restaurant_ratingValue)) {
                res.render('restaurant_rating/views/edit.ejs', {
                    page_name: 'restaurant_rating-management',
                    page_title: 'Restaurant_rating Edit',
                    user: req.user,
                    response: restaurant_ratingValue
                });
            }
            else {
                req.flash('error', "Sorry, restaurant_rating not found!");
                res.redirect(namedRouter.urlFor('restaurant_rating.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    /* @Method: delete
    // @Description: restaurant_rating delete
    */
    async delete(req, res) {
        try {
            let restaurant_ratingDelete = await restaurant_ratingRepo.updateById({ "isDeleted": true }, req.params.id);
            req.flash('success', 'Restaurant_rating removed successfully');
            res.redirect(namedRouter.urlFor('restaurant_rating.list'));
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /*
    // @Method: statusChange
    // @Description: restaurant_rating status change action
    */
    async statusChange(req, res) {
        try {
            let restaurant_rating = await restaurant_ratingRepo.getById(req.params.id);
            if (!_.isEmpty(restaurant_rating)) {
                let restaurant_ratingStatus = (restaurant_rating.status == 'Active') ? 'Inactive' : 'Active';
                let restaurant_ratingUpdate = restaurant_ratingRepo.updateById({ 'status': restaurant_ratingStatus }, req.params.id);
                req.flash('success', "Restaurant rating status has changed successfully");
                res.redirect(namedRouter.urlFor('restaurant_rating.list'));
            }
            else {
                req.flash('error', 'Restaurant_rating not found');
                res.redirect(namedRouter.urlFor('restaurant_rating.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new restaurant_ratingController();