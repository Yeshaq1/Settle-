const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const multer = require('multer');
const catController = require('userWebApp/controllers/userWebApp.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'userWebApp_photos') {
			callback(null, "./public/uploads/userWebApp")
		}
		else {
			callback(null, "./public/uploads");
		}

	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});

const request_param = multer();

namedRouter.all('/userWebApp*', auth.authenticate);

// userWebApp Listing Route
namedRouter.get("userWebApp.list", '/userWebApp/list', catController.list);

// userWebApp Get All Route
namedRouter.post("userWebApp.getall", '/userWebApp/getall', async (req, res) => {
	try {
		const success = await catController.getAll(req, res);
		res.send({
			"meta": success.meta,
			"data": success.data
		});
	} catch (error) {
		res.status(error.status).send(error);
	}
});

// userWebApp Create Route
namedRouter.get("userWebApp.create", '/userWebApp/create', catController.create);

// userWebApp Insert Route
namedRouter.post("userWebApp.insert", '/userWebApp/insert', uploadFile.any(), catController.insert);

// userWebApp Edit Route
namedRouter.get("userWebApp.edit", "/userWebApp/edit/:id", catController.edit);

// userWebApp Update Route
namedRouter.post("userWebApp.update", '/userWebApp/update', uploadFile.any(), catController.update);

// userWebApp Delete Route
namedRouter.get("userWebApp.delete", "/userWebApp/delete/:id", catController.delete);
namedRouter.get("userWebApp.deletephotos", '/userWebApp/deletephotos/:id/:imagename', request_param.any(), catController.userWebAppImgDelete);
// userWebApp status change
namedRouter.get("userWebApp.statusChange", '/userWebApp/status-change/:id', request_param.any(), catController.statusChange);


// Export the express.Router() instance
module.exports = router;