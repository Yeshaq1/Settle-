const dishesRepo = require('dishes/repositories/dishes.repository');
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

class dishesController {

    /* @Method: insert
    // @Description: save dishes action
    */
    async insert(req, res) {
        try {
            var chkData = {
                isDeleted: false,
                name: req.body.name
            };
            let checkCat = await dishesRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Dishes name already exist.");
                res.redirect(namedRouter.urlFor('dishes.create'));
            }
            else {
                // For dishes image //

                let newDishess = await dishesRepo.save(req.body);
                req.flash('success', 'Dishes created successfully.');
                res.redirect(namedRouter.urlFor('dishes.list'));
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('dishes.create'));
        }
    };


    /* @Method: update
    // @Description: dishes update action
    */
    async update(req, res) {
        try {
            const dishesId = req.body.pid;
            var chkData = {
                isDeleted: false,
                name: req.body.name,
                _id: { $ne: mongoose.Types.ObjectId(dishesId) }
            };
            let checkCat = await dishesRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Dishes name already exist.");
                res.redirect(namedRouter.urlFor('dishes.edit', {
                    id: dishesId
                }));
            }
            else {
                let dishesValue = await dishesRepo.getById(dishesId);


                let dishesUpdate = await dishesRepo.updateById(req.body, dishesId);
                if (dishesUpdate) {
                    req.flash('success', "Dishes Updated Successfully");
                    res.redirect(namedRouter.urlFor('dishes.list'));
                } else {
                    res.redirect(namedRouter.urlFor('dishes.edit', {
                        id: dishesId
                    }));
                }
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('dishes.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the dishes from DB
    */
    async list(req, res) {
        try {

            res.render('dishes/views/list.ejs', {
                page_name: 'dishes-management',
                page_title: 'Dishes List',
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the dishes from DB
    */
    async getAll(req, res) {
        try {
            let dishess = await dishesRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": dishess.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": dishess.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: dishess.data,
                message: `Data fetched successfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create dishes action
    */
    async create(req, res) {
        try {
            res.render('dishes/views/add.ejs', {
                page_name: 'dishes-management',
                page_title: 'Dishes Create',
                user: req.user
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  dishes edit page
    */
    async edit(req, res) {
        try {
            let dishesValue = await dishesRepo.getById(req.params.id);
            if (!_.isEmpty(dishesValue)) {
                res.render('dishes/views/edit.ejs', {
                    page_name: 'dishes-management',
                    page_title: 'Dishes Edit',
                    user: req.user,
                    response: dishesValue
                });
            }
            else {
                req.flash('error', "Sorry, dishes not found!");
                res.redirect(namedRouter.urlFor('dishes.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    /* @Method: delete
    // @Description: dishes delete
    */
    async delete(req, res) {
        try {
            let dishesDelete = await dishesRepo.updateById({ "isDeleted": true }, req.params.id);
            req.flash('success', 'Dishes removed successfully');
            res.redirect(namedRouter.urlFor('dishes.list'));
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /*
    // @Method: statusChange
    // @Description: dishes status change action
    */
    async statusChange(req, res) {
        try {
            let dishes = await dishesRepo.getById(req.params.id);
            if (!_.isEmpty(dishes)) {
                let dishesStatus = (dishes.status == 'Active') ? 'Inactive' : 'Active';
                let dishesUpdate = dishesRepo.updateById({ 'status': dishesStatus }, req.params.id);
                req.flash('success', "Dishes status has changed successfully");
                res.redirect(namedRouter.urlFor('dishes.list'));
            }
            else {
                req.flash('error', 'Dishes not found');
                res.redirect(namedRouter.urlFor('dishes.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new dishesController();