const tableRepo = require('table/repositories/table.repository');
const restaurantRepo = require('restaurant/repositories/restaurant.repository');
const roleRepo = require('role/repositories/role.repository');
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

class tableController {

    /* @Method: insert
    // @Description: save table action
    */
    async insert(req, res) {
        try {
            var chkData = {
                isDeleted: false,
                name: req.body.name
            };
            let checkCat = await tableRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Table name already exist.");
                res.redirect(namedRouter.urlFor('table.create'));
            }
            else {
                // For table image //

                let newTables = await tableRepo.save(req.body);
                req.flash('success', 'Table created successfully.');
                res.redirect(namedRouter.urlFor('table.list'));
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            //res.status(500).send({message: error.message});
            res.redirect(namedRouter.urlFor('table.create'));
        }
    };


    /* @Method: update
    // @Description: table update action
    */
    async update(req, res) {
        try {
            const tableId = req.body.pid;
            var chkData = {
                isDeleted: false,
                name: req.body.name,
                _id: { $ne: mongoose.Types.ObjectId(tableId) }
            };
            let checkCat = await tableRepo.getByField(chkData);
            if (!_.isEmpty(checkCat)) {
                req.flash('error', "Table name already exist.");
                res.redirect(namedRouter.urlFor('table.edit', {
                    id: tableId
                }));
            }
            else {
                let tableValue = await tableRepo.getById(tableId);


                let tableUpdate = await tableRepo.updateById(req.body, tableId);
                if (tableUpdate) {
                    req.flash('success', "Table Updated Successfully");
                    res.redirect(namedRouter.urlFor('table.list'));
                } else {
                    res.redirect(namedRouter.urlFor('table.edit', {
                        id: tableId
                    }));
                }
            }

        } catch (e) {
            const error = errorHandler(e);
            req.flash('error', error.message);
            res.redirect(namedRouter.urlFor('table.edit', {
                id: req.body.pid
            }));
        }

    };

    /* @Method: list
    // @Description: To list all the table from DB
    */
    async list(req, res) {
        try {

            res.render('table/views/list.ejs', {
                page_name: 'table-management',
                page_title: 'Table List',
                user: req.user,
            });
        } catch (e) {
            return res.status(500).send({
                message: e.message
            });
        }
    };

    /* @Method: getAll
    // @Description: To get all the table from DB
    */
    async getAll(req, res) {
        try {
            let tables = await tableRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = {
                "page": req.body.pagination.page,
                "pages": tables.pageCount,
                "perpage": req.body.pagination.perpage,
                "total": tables.totalCount,
                "sort": sortOrder,
                "field": sortField
            };

            return {
                status: 200,
                meta: meta,
                data: tables.data,
                message: `Data fetched successfully.`
            };
        } catch (e) {
            throw e;
        }
    }

    /* @Method: create
    // @Description: create table action
    */
    async create(req, res) {
        try {

            let roleDetails = await roleRepo.getByField({ role: "restaurant" });
            var restaurantAll = await restaurantRepo.getAllByField({ "isDeleted": false, "isActive": true, "role": roleDetails._id })
            res.render('table/views/add.ejs', {
                page_name: 'table-management',
                page_title: 'Table Create',
                user: req.user,
                restaurantData: restaurantAll
            });
        } catch (e) {
            throw (e);
        }
    };

    /*
    // @Method: edit
    // @Description:  table edit page
    */
    async edit(req, res) {
        try {
            let tableValue = await tableRepo.getById(req.params.id);
            let roleDetails = await roleRepo.getByField({ role: "restaurant" });
            var restaurantAll = await restaurantRepo.getAllByField({ "isDeleted": false, "isActive": true, "role": roleDetails._id })
            if (!_.isEmpty(tableValue)) {
                res.render('table/views/edit.ejs', {
                    page_name: 'table-management',
                    page_title: 'Table Edit',
                    user: req.user,
                    response: tableValue,
                    restaurantData: restaurantAll,
                    tableQRLink: `${process.env.TABLE_QR_LINK}`
                });
            }
            else {
                req.flash('error', "Sorry, table not found!");
                res.redirect(namedRouter.urlFor('table.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };




    /* @Method: delete
    // @Description: table delete
    */
    async delete(req, res) {
        try {
            let tableDelete = await tableRepo.updateById({ "isDeleted": true }, req.params.id);
            req.flash('success', 'Table removed successfully');
            res.redirect(namedRouter.urlFor('table.list'));
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /*
    // @Method: statusChange
    // @Description: table status change action
    */
    async statusChange(req, res) {
        try {
            let table = await tableRepo.getById(req.params.id);
            if (!_.isEmpty(table)) {
                let tableStatus = (table.status == 'Active') ? 'Inactive' : 'Active';
                let tableUpdate = tableRepo.updateById({ 'status': tableStatus }, req.params.id);
                req.flash('success', "Table status has changed successfully");
                res.redirect(namedRouter.urlFor('table.list'));
            }
            else {
                req.flash('error', 'Table not found');
                res.redirect(namedRouter.urlFor('table.list'));
            }
        }
        catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };
}

module.exports = new tableController();