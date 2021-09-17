const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const multer = require('multer');
const catController = require('restaurant/controllers/restaurant.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		if (file.fieldname === 'restaurant_photos') {
			callback(null, "./public/uploads/restaurant")
		}
		else if (file.fieldname === 'restaurant_menu_pdf') {
			callback(null, "./public/uploads/restaurant")
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

namedRouter.all('/restaurant*', auth.authenticate);

// restaurant Listing Route
namedRouter.get("restaurant.list", '/restaurant/list', catController.list);

// restaurant Get All Route
namedRouter.post("restaurant.getall", '/restaurant/getall', async (req, res) => {
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

// restaurant Create Route
namedRouter.get("restaurant.create", '/restaurant/create', catController.create);

// restaurant Insert Route
namedRouter.post("restaurant.insert", '/restaurant/insert', uploadFile.any(), catController.insert);

// restaurant Edit Route
namedRouter.get("restaurant.edit", "/restaurant/edit/:id", catController.edit);

// restaurant Update Route
namedRouter.post("restaurant.update", '/restaurant/update', uploadFile.any(), catController.update);

// restaurant Delete Route
namedRouter.get("restaurant.delete", "/restaurant/delete/:id", catController.delete);
namedRouter.get("restaurant.deletephotos", '/restaurant/deletephotos/:id/:imagename', request_param.any(), catController.restaurantImgDelete);
// restaurant status change
namedRouter.get("restaurant.statusChange", '/restaurant/status-change/:id', request_param.any(), catController.statusChange);


// Export the express.Router() instance
module.exports = router;