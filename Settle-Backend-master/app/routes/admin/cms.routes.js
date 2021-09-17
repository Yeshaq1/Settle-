const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const cmsController = require('cms/controllers/cms.controller');
// const auth = require("../../middlewares/auth")();

const multer = require('multer');
const request_param = multer();

//authentication section of cms
namedRouter.all('/cms*', auth.authenticate);

// admin cms list route

namedRouter.post("admin.cms.getall", '/cms/getall', async (req, res) => {
    try {
        const success = await cmsController.getAll(req, res);
        res.send({ "meta": success.meta, "data": success.data });
    } catch (error) {
        res.status(error.status).send(error);
    }
});
namedRouter.get("admin.cms.list", '/cms/list', cmsController.list);
namedRouter.get("admin.cms.edit", '/cms/edit/:id', cmsController.edit);
namedRouter.get("admin.cms.delete", '/cms/delete/:id', cmsController.destroy);
namedRouter.post("admin.cms.update", '/cms/update', request_param.any(), cmsController.update);
namedRouter.get("admin.cms.statusChange", '/cms/status-change/:id', request_param.any(), cmsController.statusChange);




//Export the express.Router() instance
module.exports = router;