const cmsRepo = require('cms/repositories/cms.repository');
const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);



class cmsController {
    constructor() {
        this.cms = [];

    }

    /* @Method: list
    // @Description: To get all the cms from DB
    */
    async list(req, res) {
        try {
            res.render('cms/views/list.ejs', {
                page_name: 'cms-list',
                page_title: 'CMS List',
                user: req.user,

            });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };


    async getAll(req, res) {
        try {
            let cms = await cmsRepo.getAll(req);

            if (_.has(req.body, 'sort')) {
                var sortOrder = req.body.sort.sort;
                var sortField = req.body.sort.field;
            } else {
                var sortOrder = -1;
                var sortField = '_id';
            }
            let meta = { "page": req.body.pagination.page, "pages": cms.pageCount, "perpage": req.body.pagination.perpage, "total": cms.totalCount, "sort": sortOrder, "field": sortField };
            return { status: 200, meta: meta, data: cms.data, message: `Data fetched successfully.` };
        } catch (e) {
            return { status: 500, data: [], message: e.message };
        }
    }

    /*
    // @Method: edit
    // @Description:  cms update page
    */
    async edit(req, res) {
        try {
            let result = {};
            let cms = await cmsRepo.getById(req.params.id);

            // This is for language section //
            // This is for language section //

            if (!_.isEmpty(cms)) {
                result.cms_data = cms;
                res.render('cms/views/edit.ejs', {
                    page_name: 'cms-list',
                    page_title: 'Update cms',
                    user: req.user,
                    response: result
                });
            } else {
                req.flash('error', "Sorry cms not found!");
                res.redirect(namedRouter.urlFor('admin.cms.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: update
    // @Description: cms update action
    */
    async update(req, res) {
        try {
            const cmsId = req.body.id;
            let cmsData = await cmsRepo.getByField({ 'title': req.body.title, _id: { $ne: cmsId } });
            // req.body.slug=req.body.title.toLowerCase()
            if (_.isEmpty(cmsData)) {
                let cmsIdUpdate = cmsRepo.updateById(req.body, cmsId)
                if (cmsIdUpdate) {
                    req.flash('success', "CMS Updated Successfully");
                    res.redirect(namedRouter.urlFor('admin.cms.list'));
                }

            } else {
                req.flash('error', "CMS is already availabe!");
                res.redirect(namedRouter.urlFor('admin.cms.edit', { id: cmsId }));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }

    };

    /*
    // @Method: status_change
    // @Description: cms status change action
    */
    async statusChange(req, res) {
        try {
            let cms = await cmsRepo.getById(req.params.id);
            if (!_.isEmpty(cms)) {
                let cmsStatus = (cms.status == 'Active') ? 'Inactive' : 'Active';
                let cmsUpdate = await cmsRepo.updateById({ 'status': cmsStatus }, req.params.id);
                if (cmsUpdate) {
                    req.flash('success', "Cms status has changed successfully");
                    res.redirect(namedRouter.urlFor('admin.cms.list'));
                }
            } else {
                req.flash('error', "sorry cms data not found");
                res.redirect(namedRouter.urlFor('admin.cms.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

    /* @Method: delete
    // @Description: cms delete
    */
    async destroy(req, res) {
        try {
            let cmsDelete = await cmsRepo.delete(req.params.id)
            if (!_.isEmpty(cmsDelete)) {
                req.flash('success', 'Cms Removed Successfully');
                res.redirect(namedRouter.urlFor('admin.cms.list'));
            }
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    };

}

module.exports = new cmsController();