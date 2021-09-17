const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const multer = require('multer');
const catController = require('table/controllers/table.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'image') {
			callback(null, "./public/uploads/table")
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

namedRouter.all('/table*', auth.authenticate);

// table Listing Route
namedRouter.get("table.list", '/table/list', catController.list);

// table Get All Route
namedRouter.post("table.getall", '/table/getall', async (req, res) => {
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

// table Create Route
namedRouter.get("table.create", '/table/create', catController.create);

// table Insert Route
namedRouter.post("table.insert", '/table/insert', request_param.any(), catController.insert);

// table Edit Route
namedRouter.get("table.edit", "/table/edit/:id", catController.edit);

// table Update Route
namedRouter.post("table.update", '/table/update', request_param.any(), catController.update);

// table Delete Route
namedRouter.get("table.delete", "/table/delete/:id", catController.delete);

// table status change
namedRouter.get("table.statusChange", '/table/status-change/:id', request_param.any(), catController.statusChange);


// Export the express.Router() instance
module.exports = router;