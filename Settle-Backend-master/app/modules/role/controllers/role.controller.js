const roleRepo = require('role/repositories/role.repository');
const fs = require('fs');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);

class roleController {
    constructor() {
    }

    /* @Method: list
    // @Description: To get all the promocodes from DB
    */
    async list(req, res) {
        try {
            res.render('role/views/list.ejs', {
                page_name: 'role-management',
                page_title: 'Roles List',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: getAll
   // @Description: To get all the promocodes from DB, this will called from list
   */
    async getAll(req, res) {
        try {
            let role = await roleRepo.getAll({}, req.body.pagination.page || 1);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = 'roleDisplayName';
            }
            let meta = { "page": req.body.pagination.page, "pages": role.pages, "perpage": req.body.pagination.perpage, "total": role.total, "sort": sortOrder, "field": sortField };
            return { status: 200, meta: meta, data: role.docs, message: `Data fetched succesfully.` };
        } catch (e) {

            return { status: 500, data: [], message: e.message };
        }
    }

    /* @Method: create
    // @Description: To get all the promocodes from DB
    */
    async create(req, res) {
        try {
            res.render('role/views/add1.ejs', {
                page_name: 'role-management',
                page_title: 'Create Role',
                user: req.user
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: store
    // @Description: To create role
    */
    async store(req, res) {
        try {
            let role = await roleRepo.getByField({ role: req.body.role });
            if (!role) {
                let save = await roleRepo.save(req.body);
                console.log(71, save);
                req.flash('success', "Role added successfully.");
                res.redirect(namedRouter.urlFor('admin.role.list'));
            }
        } catch (e) {
            console.log(76, e);
            return { status: 500, data: [], message: e.message };
        }
    };

    /* @Method: edit
    // @Description: To edit role
    */
    async edit(req, res) {
        try {
            let role = await roleRepo.getById(req.params.id);
            res.render('role/views/edit.ejs', {
                page_name: 'role-management',
                page_title: 'Edit Role',
                user: req.user,
                response: role
            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: update
    // @Description: To update role
    */
    async update(req, res) {
        try {
            let role = await roleRepo.getByField({ role: req.body.role, _id: { $ne: req.body.roleId } });
            if (!role) {
                let findRole = await roleRepo.getById(req.body.roleId);
                if (!_.isEmpty(findRole)) {
                    let save = await roleRepo.updateById(req.body, req.body.roleId);
                    req.flash('success', "Role updated successfully.");
                    res.redirect(namedRouter.urlFor('admin.role.list'));
                } else {
                    req.flash('error', "Role not found.");
                    res.redirect(namedRouter.urlFor('admin.role.list'));
                }

            }
        } catch (e) {
            return { status: 500, data: [], message: e.message };
        }
    };

}

module.exports = new roleController();