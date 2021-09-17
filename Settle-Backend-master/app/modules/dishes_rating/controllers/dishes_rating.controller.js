const dishes_ratingRepo = require('dishes_rating/repositories/dishes_rating.repository');
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

class dishes_ratingController {

    /* @Method: insert
    // @Description: save dishes_rating action
    */
    async insert(req, res) {
        try {
            var chkData = {
                isDeleted: false,
                name: req.body.name
            };
            let checkCat = await dishes_ratingRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Dishes rating name already exist.");
                res.redirect(namedRouter.urlFor('dishes_rating.create'));
            }
            else {
                // For dishes_rating image //

                let newDishes_ratings = await dishes_ratingRepo.save(req.body);
                req.flash('success', 'Dishes_rating created successfully.');
                res.redirect(namedRouter.urlFor('dishes_rating.list'));
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('dishes_rating.create'));
        }
    };


    /* @Method: update
    // @Description: dishes_rating update action
    */
    async update(req, res) {
        try {
            const dishes_ratingId = req.body.pid;
            var chkData = {
                isDeleted: false,
                name: req.body.name,
                _id: { $ne: mongoose.Types.ObjectId(dishes_ratingId) }
            };
            let checkCat = await dishes_ratingRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Dishes rating name already exist.");
                res.redirect(namedRouter.urlFor('dishes_rating.edit', {
                    id: dishes_ratingId
                }));
            }
            else {
                let dishes_ratingValue = await dishes_ratingRepo.getById(dishes_ratingId);


                let dishes_ratingUpdate = await dishes_ratingRepo.updateById(req.body, dishes_ratingId);
                if (dishes_ratingUpdate) {
                    req.flash('success', "Dishes rating Updated Successfully");
                    res.redirect(namedRouter.urlFor('dishes_rating.list'));
                } else {
                    res.redirect(namedRouter.urlFor('dishes_rating.edit', {
                        id: dishes_ratingId
                    }));
                }
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('dishes_rating.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the dishes_rating from DB
    */
    async list(req, res) {
        try {

            res.render('dishes_rating/views/list.ejs', {
                page_name: 'dishes_rating-management',
                page_title: 'Dishes_rating List',
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the dishes_rating from DB
    */
    async getAll(req, res) {
        try {
            let dishes_ratings = await dishes_ratingRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": dishes_ratings.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": dishes_ratings.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: dishes_ratings.data,
                message: `Data fetched successfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create dishes_rating action
    */
    async create(req, res) {
        try {
            res.render('dishes_rating/views/add.ejs', {
                page_name: 'dishes_rating-management',
                page_title: 'Dishes_rating Create',
                user: req.user
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  dishes_rating edit page
    */
    async edit(req, res) {
        try {
            let dishes_ratingValue = await dishes_ratingRepo.getById(req.params.id);
            if (!_.isEmpty(dishes_ratingValue)) {
                res.render('dishes_rating/views/edit.ejs', {
                    page_name: 'dishes_rating-management',
                    page_title: 'Dishes_rating Edit',
                    user: req.user,
                    response: dishes_ratingValue
                });
            }
            else {
                req.flash('error', "Sorry, dishes_rating not found!");
                res.redirect(namedRouter.urlFor('dishes_rating.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    /* @Method: delete
    // @Description: dishes_rating delete
    */
    async delete(req, res) {
        try {
            let dishes_ratingDelete = await dishes_ratingRepo.updateById({ "isDeleted": true }, req.params.id);
            req.flash('success', 'Dishes_rating removed successfully');
            res.redirect(namedRouter.urlFor('dishes_rating.list'));
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /*
    // @Method: statusChange
    // @Description: dishes_rating status change action
    */
    async statusChange(req, res) {
        try {
            let dishes_rating = await dishes_ratingRepo.getById(req.params.id);
            if (!_.isEmpty(dishes_rating)) {
                let dishes_ratingStatus = (dishes_rating.status == 'Active') ? 'Inactive' : 'Active';
                let dishes_ratingUpdate = dishes_ratingRepo.updateById({ 'status': dishes_ratingStatus }, req.params.id);
                req.flash('success', "Dishes rating status has changed successfully");
                res.redirect(namedRouter.urlFor('dishes_rating.list'));
            }
            else {
                req.flash('error', 'Dishes_rating not found');
                res.redirect(namedRouter.urlFor('dishes_rating.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new dishes_ratingController();