const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const userWebAppController = require('webservice/userWebApp.controller');

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





/**
 * @api {post} /userWebApp/login User SignIn
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiParam {string} email Email
 * @apiParam {string} phone Phone
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {},
    "message": "A 6 digit verification code has been sent to your email/phone."
}
*/
namedRouter.post("api.userWebApp.login", '/userWebApp/login', request_param.any(), async (req, res) => {
    try {
        const success = await userWebAppController.login(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /userWebApp/verifyLogin User SignIn verify code
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiParam {string} email Email
 * @apiParam {string} phone Phone
 * @apiParam {number} code  Verify Code
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "loggedIn": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzExN2U1YTIyN2VmMWM1NDczMTU3NCIsImlhdCI6MTYwNjcyNDY4MiwiZXhwIjoxNjA2ODExMDgyfQ.97sFENUVsSDkPv2teIeKVg4mIGKHLZsiYPpEOhmec-Q",
    "data": {
        "first_name": "test",
        "last_name": "test",
        "email": "testuser2@yopmail.com",
        "user_name": "",
        "phone": "+919563743580",
        "zip_code": "12345",
        "password": "",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "",
        "restaurant_photos": [],
        "restaurant_menu_pdf": "",
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "mobileVerificationCode": "270943",
        "isMobileVerified": false,
        "loggedInToken": "552547",
        "isLoggedIn": true,
        "deviceToken": "",
        "deviceType": "android",
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fc117e5a227ef1c54731574",
        "role": {
            "rolegroup": "backend",
            "desc": "User of the application.",
            "_id": "5fc0d43d026424da739067ed",
            "roleDisplayName": "User",
            "role": "user",
            "id": "5fc0d43d026424da739067ed"
        },
        "createdAt": "2020-11-27T15:14:45.297Z",
        "updatedAt": "2020-11-30T08:14:07.542Z"
    },
    "user_type": "user",
    "message": "You have successfully logged in."
}
*/
namedRouter.post("api.userWebApp.verifyLogin", '/userWebApp/verifyLogin', request_param.any(), async (req, res) => {
    try {
        const success = await userWebAppController.vefifyLoginCode(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /userWebApp/verifyPhone User verify Phone
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiParam {string} phone Phone
 * @apiParam {number} code  Verify Code
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "first_name": "test",
        "last_name": "test",
        "email": "testuser2@yopmail.com",
        "user_name": "",
        "phone": "+919563743580",
        "zip_code": "12345",
        "password": "",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "",
        "restaurant_photos": [],
        "restaurant_menu_pdf": "",
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "mobileVerificationCode": "270943",
        "isMobileVerified": true,
        "loggedInToken": "286058",
        "isLoggedIn": false,
        "deviceToken": "",
        "deviceType": "",
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fc117e5a227ef1c54731574",
        "role": "5fc0d43d026424da739067ed",
        "createdAt": "2020-11-27T15:14:45.297Z",
        "updatedAt": "2020-12-07T12:26:02.033Z"
    },
    "user_type": "user",
    "message": "This phone number has been verified successfully."
}
*/
namedRouter.post("api.userWebApp.verifyPhone", '/userWebApp/verifyPhone', request_param.any(), async (req, res) => {
    try {
        const success = await userWebAppController.vefifyPhone(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /userWebApp/signup User Register
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiParam {string} email Email
 * @apiParam {string} first_name First name
 * @apiParam {string} last_name Last name
 * @apiParam {string} phone Phone
 * @apiParam {string} zip_code Postal Code
 * @apiParam {number} card_number Card Number
 * @apiParam {number} exp_month Card exp_month
 * @apiParam {number} exp_year Card exp_year
 * @apiParam {number} cvv Card cvv
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "first_name": "test",
        "last_name": "test",
        "email": "testuser2@yopmail.com",
        "user_name": "",
        "phone": "1212121212",
        "zip_code": "12345",
        "password": "",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "",
        "restaurant_photos": [],
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "deviceToken": "",
        "deviceType": "android",
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fc0ed2e906b53066c7644e6",
        "role": "5fc0d43d026424da739067ed",
        "createdAt": "2020-11-27T12:12:30.067Z",
        "updatedAt": "2020-11-27T12:12:30.067Z"
    },
    "message": "Registered successfully."
}
*/
namedRouter.post("api.userWebApp.signup", '/userWebApp/signup', request_param.any(), async (req, res) => {
    try {
        const success = await userWebAppController.signup(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.all('/userWebApp*', auth.authenticateAPI);

/**
 * @api {get} /userWebApp/logout Logout
 * @apiGroup User
 * @apiHeader x-access-token User's Access Token
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": [],
    "isLoggedIn": false,
    "message": "Logout successfully"
}
*/
namedRouter.get("api.userWebApp.logout", '/userWebApp/logout', request_param.any(), async (req, res) => {
    try {
        const success = await userWebAppController.logout(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {get} /userWebApp/getprofile Users Profile 
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiHeader x-access-token User's Access Token
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "first_name": "Subhadip",
        "last_name": "Patra",
        "email": "test.sqr10@yopmail.com",
        "user_name": "",
        "phone": "+919563743580",
        "zip_code": "",
        "password": "",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "",
        "restaurant_photos": [],
        "restaurant_menu_pdf": "",
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "mobileVerificationCode": "466947",
        "isMobileVerified": true,
        "loggedInToken": "312555",
        "isLoggedIn": true,
        "deviceToken": "",
        "deviceType": "android",
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fce6388f9d742f641f6c462",
        "role": "5fc0d43d026424da739067ed",
        "createdAt": "2020-12-07T17:16:56.118Z",
        "updatedAt": "2020-12-08T09:59:24.949Z"
    },
    "message": "Profile Info fetched Successfully"
}
*/
namedRouter.get('api.userWebApp.getprofile', '/userWebApp/getprofile', async (req, res) => {
    try {
        const success = await userWebAppController.getMyProfile(req);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /userWebApp/profile/update Update Profile 
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiParam {String} first_name First Name
 * @apiParam {String} last_name Last Name
 * @apiParam {String} phone Phone
 * @apiParam {String} email
 * @apiHeader x-access-token User's Access Token
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "first_name": "Subhadip",
        "last_name": "Patra",
        "email": "test.sqr10@yopmail.com",
        "user_name": "",
        "phone": "+919563743580",
        "zip_code": "",
        "password": "",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "",
        "restaurant_photos": [],
        "restaurant_menu_pdf": "",
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "mobileVerificationCode": "288506",
        "isMobileVerified": false,
        "loggedInToken": "312555",
        "isLoggedIn": true,
        "deviceToken": "",
        "deviceType": "android",
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fce6388f9d742f641f6c462",
        "role": "5fc0d43d026424da739067ed",
        "createdAt": "2020-12-07T17:16:56.118Z",
        "updatedAt": "2020-12-08T11:46:57.786Z"
    },
    "message": "Restaurant details updated successfully"
}
*/
namedRouter.post("api.userWebApp.profileUpdate", '/userWebApp/profile/update', uploadFile.any(), async (req, res) => {
    try {
        const success = await userWebAppController.updateProfile(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});
// Export the express.Router() instance
module.exports = router;