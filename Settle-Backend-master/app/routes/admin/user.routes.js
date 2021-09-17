const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const querystring = require('querystring');
const multer = require('multer');
const userController = require('user/controllers/user.controller');

const Storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./public/uploads/user");
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + "_" + file.originalname.replace(/\s/g, '_'));
	}
});

const uploadFile = multer({
	storage: Storage
});
const request_param = multer();




// login render route
namedRouter.get('user.login',`/`, userController.login);

// login process route
namedRouter.post("user.login.process", '/login', userController.signin);


/*
// @Route: Users Forgotpassowrd [Admin]
*/
namedRouter.post('admin.user.forgotPassword', '/user/forgotpassword', request_param.any(), userController.forgotPassword);

namedRouter.get('user.logout', "/logout", userController.logout);

namedRouter.all('/*', auth.authenticate);

/*
// @Route: Users Dashboard [Admin]
*/
// dashboard route
namedRouter.get("user.dashboard", '/dashboard', userController.dashboard);





 namedRouter.get("admin.profile", '/profile/:id', request_param.any(), userController.viewmyprofile);

// admin update profile
namedRouter.post("admin.updateProfile", '/update/profile', uploadFile.any(), userController.updateprofile);

// admin change Password
namedRouter.get("admin.changepassword", '/change/password', userController.adminChangePassword);

/*
// @Route: Chnage password [Admin] action
*/
namedRouter.post("admin.updateAdminPassword", '/update/admin-password', request_param.any(), userController.adminUpdatePassword);

/*
// @Route: Listing [Sub Admin] action
*/
namedRouter.get("user.subadmin.listing", '/user/sub-admin/listing', userController.subAdminlist);

// Get All Users
namedRouter.post("user.subadmin.getall", '/user/sub-admin/getall', async (req, res) => {
	try {
		const success = await userController.getAllSubAdmin(req, res);
		res.send({
			"meta": success.meta,
			"data": success.data
		});
	} catch (error) {
		res.status(error.status).send(error);
	}
});

namedRouter.get("user.subadmin.create", '/user/sub-admin/create', userController.createSubAdmin);

namedRouter.post("user.subadmin.insert", '/user/sub-admin/insert', request_param.any(), userController.insertSubAdmin);

// User Edit Route
namedRouter.get("user.subadmin.edit", "/user/sub-admin/edit/:id", userController.editSubAdmin);

// User Update Route
namedRouter.post("user.subadmin.update", '/user/sub-admin/update', uploadFile.any(), userController.updateSubAdmin);

// User Delete Route
namedRouter.get("user.subadmin.delete", "/user/sub-admin/delete/:id", userController.deleteSubAdmin);

namedRouter.get("user.subadmin.statusChange", '/user/sub-admin/status-change/:id',request_param.any(), userController.statusChangeSubAdmin);

//Route Error
//Capture All 404 errors
namedRouter.get('*',userController.notFoundPage);

// Export the express.Router() instance
module.exports = router;