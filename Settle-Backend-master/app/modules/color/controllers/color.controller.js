const colorRepo = require('color/repositories/color.repository');
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

class colorController {

    /* @Method: insert
    // @Description: save color action
    */
    async insert(req, res) {
        try {
            var chkData = {
                isDeleted: false,
                name: req.body.name
            };
            let checkCat = await colorRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Color name already exist.");
                res.redirect(namedRouter.urlFor('color.create'));
            }
            else {
                // For color image //

                let newColors = await colorRepo.save(req.body);
                req.flash('success', 'Color created successfully.');
                res.redirect(namedRouter.urlFor('color.list'));
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('color.create'));
        }
    };


    /* @Method: update
    // @Description: color update action
    */
    async update(req, res) {
        try {
            const colorId = req.body.pid;
            var chkData = {
                isDeleted: false,
                name: req.body.name,
                _id: { $ne: mongoose.Types.ObjectId(colorId) }
            };
            let checkCat = await colorRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Color name already exist.");
                res.redirect(namedRouter.urlFor('color.edit', {
                    id: colorId
                }));
            }
            else {
                let colorValue = await colorRepo.getById(colorId);


                let colorUpdate = await colorRepo.updateById(req.body, colorId);
                if (colorUpdate) {
                    req.flash('success', "Color Updated Successfully");
                    res.redirect(namedRouter.urlFor('color.list'));
                } else {
                    res.redirect(namedRouter.urlFor('color.edit', {
                        id: colorId
                    }));
                }
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('color.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the color from DB
    */
    async list(req, res) {
        try {

            res.render('color/views/list.ejs', {
                page_name: 'color-management',
                page_title: 'Color List',
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the color from DB
    */
    async getAll(req, res) {
        try {
            let colors = await colorRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": colors.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": colors.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: colors.data,
                message: `Data fetched successfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create color action
    */
    async create(req, res) {
        try {
            res.render('color/views/add.ejs', {
                page_name: 'color-management',
                page_title: 'Color Create',
                user: req.user
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  color edit page
    */
    async edit(req, res) {
        try {
            let colorValue = await colorRepo.getById(req.params.id);
            if (!_.isEmpty(colorValue)) {
                res.render('color/views/edit.ejs', {
                    page_name: 'color-management',
                    page_title: 'Color Edit',
                    user: req.user,
                    response: colorValue
                });
            }
            else {
                req.flash('error', "Sorry, color not found!");
                res.redirect(namedRouter.urlFor('color.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    /* @Method: delete
    // @Description: color delete
    */
    async delete(req, res) {
        try {
            let colorDelete = await colorRepo.updateById({ "isDeleted": true }, req.params.id);
            req.flash('success', 'Color removed successfully');
            res.redirect(namedRouter.urlFor('color.list'));
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /*
    // @Method: statusChange
    // @Description: color status change action
    */
    async statusChange(req, res) {
        try {
            let color = await colorRepo.getById(req.params.id);
            if (!_.isEmpty(color)) {
                let colorStatus = (color.status == 'Active') ? 'Inactive' : 'Active';
                let colorUpdate = colorRepo.updateById({ 'status': colorStatus }, req.params.id);
                req.flash('success', "Color status has changed successfully");
                res.redirect(namedRouter.urlFor('color.list'));
            }
            else {
                req.flash('error', 'Color not found');
                res.redirect(namedRouter.urlFor('color.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new colorController();