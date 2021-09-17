const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');

const multer = require('multer');
const settingController = require('setting/controllers/setting.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'site_logo') {
			callback(null, "./public/uploads/settings/sitelogo")
		} else {
			callback(null, "./public/uploads/settings/sitelogo");
		}
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});
const request_param = multer();

namedRouter.all('/setting*', auth.authenticate);

/*
// @Route: setting List
*/
namedRouter.get("setting.listing", '/setting/listing', settingController.list);


namedRouter.post("setting.getall", '/setting/getall', async (req, res) => {
	try {
		const success = await settingController.getAllData(req, res);
		res.send({
			"meta": success.meta,
			"data": success.data
		});
	} catch (error) {
		res.status(error.status).send(error);
	}
});

/*
// @Route: Render Edit setting
*/

namedRouter.get("setting.edit", "/setting/edit/:id", settingController.edit);

/*
// @Route: Update setting Action
*/
namedRouter.post("setting.update", '/setting/update', request_param.any(), settingController.update);


// Export the express.Router() instance
module.exports = router;