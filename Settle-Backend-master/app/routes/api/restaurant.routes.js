const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const multer = require('multer');
const restaurantController = require('webservice/restaurant.controller');
const transactionController = require('webservice/transaction.controller');
const request_param = multer();
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






/**
 * @api {post} /restaurant/login Restaurant SignIn
 * @apiVersion 1.0.0
 * @apiGroup Restaurant
 * @apiParam {string} email Email
 * @apiParam {string} password Password
 * @apiParam {string} deviceToken Device Token
 * @apiParam {string} deviceType Device Type[ios/android]
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzBhYTlkMGZhMGM5MjdlYzQ1ODlkZSIsImlhdCI6MTYwNjQ3MDQwMCwiZXhwIjoxNjA2NTU2ODAwfQ.ZgVsRtp17MheybyG-cdzG-zPARlEn-rUGVJnZ8T-O5M",
    "loggedIn": true,
    "data": {
        "first_name": "",
        "last_name": "",
        "email": "res1@yopmail.com",
        "user_name": "",
        "phone": "",
        "password": "$2a$08$BY8QaIy43N3dKxe5w5IUROs48KBt1YArP1a76a2PnRHkCZjHJyvY2",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "Restaurant 1",
        "restaurant_photos": [
            "1606470332152_brand4.jpg",
            "1606470332158_brand2.jpg"
        ],
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "deviceToken": null,
        "deviceType": null,
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fc0aa9d0fa0c927ec4589de",
        "role": {
            "rolegroup": "backend",
            "desc": "Restaurant of the application.",
            "_id": "5fbfa1b3026424da73720cec",
            "roleDisplayName": "Restaurant",
            "role": "restaurant",
            "id": "5fbfa1b3026424da73720cec"
        },
        "createdAt": "2020-11-27T07:28:29.760Z",
        "updatedAt": "2020-11-27T09:45:32.750Z"
    },
    "user_type": "restaurant",
    "message": "You have successfully logged in."
}
*/
namedRouter.post("api.restaurant.login", '/restaurant/login', request_param.any(), async (req, res) => {
    try {
        const success = await restaurantController.loginRes(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});
/**
 * @api {post} /restaurant/forgot-password Forgot Password
 * @apiVersion 1.0.0
 * @apiGroup Restaurant
 * @apiParam {string} email Email
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {},
    "message": "A reset password link has been sent to your email."
}
*/
namedRouter.post("api.restaurant.forgot-password", '/restaurant/forgot-password', request_param.any(), async (req, res) => {
    try {
        const success = await restaurantController.forgotPassword(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

/**
 * @api {post} /restaurant/resetPassword/:code Restaurant Reset Password
 * @apiVersion 1.0.0
 * @apiGroup Restaurant
 * @apiParam {params} code Reset Code
 * @apiParam {string} password Reset Password
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "first_name": "",
        "last_name": "",
        "email": "res1@yopmail.com",
        "user_name": "",
        "phone": "",
        "password": "$2a$08$Hp0PrEAjGdbfMTSYeoyot.25IEH1/8HHKJ.v6vhkmsEQ8YjkZD8Ku",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "Restaurant 1",
        "restaurant_photos": [
            "1606470332152_brand4.jpg",
            "1606470332158_brand2.jpg"
        ],
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "deviceToken": null,
        "deviceType": null,
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fc0aa9d0fa0c927ec4589de",
        "role": "5fbfa1b3026424da73720cec",
        "createdAt": "2020-11-27T07:28:29.760Z",
        "updatedAt": "2020-11-27T09:53:27.332Z"
    },
    "message": "Password Changed Successfully."
}
*/
namedRouter.post("api.restaurant.resetPassword", '/restaurant/resetPassword/:code', request_param.any(), async (req, res) => {
    try {
        const success = await restaurantController.resetPassword(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});


/**
 * @api {get} /restaurant/table/:id/ Get Restaurant Table data
 * @apiGroup Restaurant
 * @apiparam {params} id Restaurant Table Id
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "table": {
            "name": "Table A1",
            "seat": [
                "Seat 1",
                "Seat 2"
            ],
            "restaurant_id": "5fc0aa9d0fa0c927ec4589de",
            "status": "Active",
            "isDeleted": false,
            "_id": "5fc78578ed0b4424887c351e",
            "createdAt": "2020-12-02T12:15:52.489Z",
            "updatedAt": "2020-12-02T13:06:58.430Z",
            "__v": 0
        },
        "restaurant": {
            "first_name": "",
            "last_name": "",
            "email": "res1@yopmail.com",
            "user_name": "",
            "phone": "",
            "zip_code": "",
            "password": "$2a$08$SKDAEIM2EyQhNUYDQGxBaOND52Q2CVrTWsrYcWT69J8cVz77glt6C",
            "profile_image": "",
            "verificationCode": "",
            "restaurant_name": "Restaurant 1",
            "restaurant_photos": [
                "1606471495040_brand2.jpg",
                "1606473086364_brand3.png"
            ],
            "restaurant_menu_pdf": "1606484699757_Restaurant_Webapp.pdf",
            "register_type": "normal",
            "isVerified": false,
            "isDeleted": false,
            "mobileVerificationCode": "",
            "isMobileVerified": false,
            "loggedInToken": "",
            "isLoggedIn": false,
            "deviceToken": null,
            "deviceType": null,
            "invalidLoginAttempts": 0,
            "isActive": true,
            "_id": "5fc0aa9d0fa0c927ec4589de",
            "role": "5fbfa1b3026424da73720cec",
            "createdAt": "2020-11-27T07:28:29.760Z",
            "updatedAt": "2020-11-30T12:52:22.443Z"
        }
    },
    "message": "Record fetched successfully."
}
*/
namedRouter.get("api.restaurant.table", '/restaurant/table/:id/', request_param.any(), async (req, res) => {
    try {
        const success = await restaurantController.restaurantGetTable(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

namedRouter.all('/restaurant*', auth.authenticateAPI);

/**
 * @api {get} /restaurant/logout Logout
 * @apiGroup Restaurant
 * @apiHeader x-access-token User's Access Token
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": [],
    "isLoggedIn": false,
    "message": "Logout successfully"
}
*/
namedRouter.get("api.restaurant.logout", '/restaurant/logout', request_param.any(), async (req, res) => {
    try {
        const success = await restaurantController.logout(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
* @api {post} /restaurant/profile/update Restaurant Profile Update
* @apiVersion 1.0.0
* @apiGroup Restaurant
* @apiHeader x-access-token User's Access Token
* @apiParam {string} restaurant_name Restaurant Name
* @apiParam {string} email Email
* @apiParam {Array} restaurant_photos restaurant photos
* @apiParam {string} restaurant_menu_pdf restaurant menu pdf
* @apiSuccessExample {json} Success
* {
  "status": 200,
  "data": {
      "first_name": "testc1",
      "last_name": "test",
      "email": "testc1@yopmail.com",
      "phone": "9898989898",
      "password": "$2a$08$/yUIzWcFUicxSn9IyNmxIewxyWoJRstPi6IJ2ieCq.ttLM4d8TjXu",
      "bio": "<p>bio</p>\r\n",
      "address": "test addr",
      "profile_image": "1601368381650_profileImage_1580380248488_0i1XbVjul86E_CSyf.jpg.jpg",
      "verificationCode": "",
      "register_type": "normal",
      "isVerified": true,
      "isDeleted": false,
      "deviceToken": "",
      "deviceType": "android",
      "isActive": true,
      "_id": "5f72d3191ba61e2600e27b78",
      "role": "5f6de0d6d29cd33b67e73884",
      "createdAt": "2020-09-29T06:24:25.928Z",
      "updatedAt": "2020-09-29T14:54:04.183Z"
  },
  "message": "User details updated successfully"
}
*/
namedRouter.post("api.restaurant.profile", '/restaurant/profile/update', uploadFile.any(), async (req, res) => {
    try {
        const success = await restaurantController.updateProfile(req);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

/**
 * @api {get} /restaurant/getprofile Get Profile
 * @apiGroup Restaurant
 * @apiHeader x-access-token User's Access Token
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "first_name": "",
        "last_name": "",
        "email": "res1@yopmail.com",
        "user_name": "",
        "phone": "",
        "password": "$2a$08$mvB862DKIYJPmStRN7chrexQhP6bRtX1cJ6rQ3H.q9BmrAb.2sxOO",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "Restaurant 1",
        "restaurant_photos": [
            "1606470332152_brand4.jpg",
            "1606470332158_brand2.jpg"
        ],
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "deviceToken": null,
        "deviceType": null,
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fc0aa9d0fa0c927ec4589de",
        "role": "5fbfa1b3026424da73720cec",
        "createdAt": "2020-11-27T07:28:29.760Z",
        "updatedAt": "2020-11-27T09:54:52.256Z"
    },
    "message": "Profile Info fetched Successfully"
}
*/
namedRouter.get("api.restaurant.getprofile", '/restaurant/getprofile', request_param.any(), async (req, res) => {
    try {
        const success = await restaurantController.getMyProfile(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /restaurant/getfeedbacks Get Feedbacks
 * @apiGroup Restaurant
 * @apiParam {String} start_date 
 * @apiParam {String} end_date 
 * @apiParam {Array}  rating
 * @apiHeader x-access-token User's Access Token
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "restaurent_feedback_list": [
            {
                "_id": "5fc4c3162b67cd1c20c0ce06",
                "user": {
                    "_id": "5fc117e5a227ef1c54731574",
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
                    "deviceToken": "",
                    "deviceType": "",
                    "invalidLoginAttempts": 0,
                    "isActive": true,
                    "role": "5fc0d43d026424da739067ed",
                    "createdAt": "2020-11-27T15:14:45.297Z",
                    "updatedAt": "2020-11-30T09:19:59.656Z",
                    "loggedInToken": "286058",
                    "isLoggedIn": false
                },
                "comment": "Good",
                "food": 4,
                "service": 3,
                "ambiance": 1,
                "createdAt": "2020-11-30T10:01:58.043Z"
            },
            {
                "_id": "5fc4c5082b67cd1c20c0ce07",
                "user": {
                    "_id": "5fc117e5a227ef1c54731574",
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
                    "deviceToken": "",
                    "deviceType": "",
                    "invalidLoginAttempts": 0,
                    "isActive": true,
                    "role": "5fc0d43d026424da739067ed",
                    "createdAt": "2020-11-27T15:14:45.297Z",
                    "updatedAt": "2020-11-30T09:19:59.656Z",
                    "loggedInToken": "286058",
                    "isLoggedIn": false
                },
                "comment": "Awasome",
                "food": 5,
                "service": 5,
                "ambiance": 4,
                "createdAt": "2020-11-30T10:10:16.279Z"
            }
        ],
        "avgRating_restaurent": [
            {
                "_id": null,
                "avgFoodRating": 4.5,
                "avgServiceRating": 4,
                "avgAmbianceRating": 2.5
            }
        ],
        "dishes_feedback_list": [
            {
                "_id": "5fc4cca8e7c8821cb44cdc24",
                "dish_id": "5fc4c8df026424da73e107ae",
                "user_id": "5fc117e5a227ef1c54731574",
                "rating": 5,
                "comment": "Awasome",
                "status": "Active",
                "isDeleted": false,
                "createdAt": "2020-11-30T10:42:48.957Z",
                "updatedAt": "2020-11-30T10:42:48.957Z",
                "__v": 0,
                "dishes": {
                    "_id": "5fc4c8df026424da73e107ae",
                    "restaurant_id": "5fc0aa9d0fa0c927ec4589de",
                    "name": "Cheese Burger",
                    "status": "Active",
                    "isDeleted": false,
                    "price": 40,
                    "createdAt": "2020-11-30T10:01:58.043Z",
                    "updatedAt": "2020-11-30T10:01:58.043Z",
                    "__v": 0
                },
                "users": {
                    "_id": "5fc117e5a227ef1c54731574",
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
                    "deviceToken": "",
                    "deviceType": "",
                    "invalidLoginAttempts": 0,
                    "isActive": true,
                    "role": "5fc0d43d026424da739067ed",
                    "createdAt": "2020-11-27T15:14:45.297Z",
                    "updatedAt": "2020-11-30T09:19:59.656Z",
                    "loggedInToken": "286058",
                    "isLoggedIn": false
                }
            },
            {
                "_id": "5fc4d87a4ce8c61b00e89785",
                "dish_id": "5fc4d855026424da73e2f48b",
                "user_id": "5fc117e5a227ef1c54731574",
                "rating": 4,
                "comment": "Good",
                "status": "Active",
                "isDeleted": false,
                "createdAt": "2020-11-30T11:33:14.960Z",
                "updatedAt": "2020-11-30T11:33:14.960Z",
                "__v": 0,
                "dishes": {
                    "_id": "5fc4d855026424da73e2f48b",
                    "restaurant_id": "5fc0aa9d0fa0c927ec4589de",
                    "name": "Piza",
                    "status": "Active",
                    "isDeleted": false,
                    "price": 50,
                    "createdAt": "2020-11-30T10:01:58.043Z",
                    "updatedAt": "2020-11-30T10:01:58.043Z",
                    "__v": 0
                },
                "users": {
                    "_id": "5fc117e5a227ef1c54731574",
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
                    "deviceToken": "",
                    "deviceType": "",
                    "invalidLoginAttempts": 0,
                    "isActive": true,
                    "role": "5fc0d43d026424da739067ed",
                    "createdAt": "2020-11-27T15:14:45.297Z",
                    "updatedAt": "2020-11-30T09:19:59.656Z",
                    "loggedInToken": "286058",
                    "isLoggedIn": false
                }
            },
            {
                "_id": "5fc4d9924ce8c61b00e89786",
                "dish_id": "5fc4d855026424da73e2f48b",
                "user_id": "5fc117e5a227ef1c54731574",
                "rating": 3,
                "comment": "Good",
                "status": "Active",
                "isDeleted": false,
                "createdAt": "2020-11-30T11:37:54.118Z",
                "updatedAt": "2020-11-30T11:37:54.118Z",
                "__v": 0,
                "dishes": {
                    "_id": "5fc4d855026424da73e2f48b",
                    "restaurant_id": "5fc0aa9d0fa0c927ec4589de",
                    "name": "Piza",
                    "status": "Active",
                    "isDeleted": false,
                    "price": 50,
                    "createdAt": "2020-11-30T10:01:58.043Z",
                    "updatedAt": "2020-11-30T10:01:58.043Z",
                    "__v": 0
                },
                "users": {
                    "_id": "5fc117e5a227ef1c54731574",
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
                    "deviceToken": "",
                    "deviceType": "",
                    "invalidLoginAttempts": 0,
                    "isActive": true,
                    "role": "5fc0d43d026424da739067ed",
                    "createdAt": "2020-11-27T15:14:45.297Z",
                    "updatedAt": "2020-11-30T09:19:59.656Z",
                    "loggedInToken": "286058",
                    "isLoggedIn": false
                }
            }
        ],
        "avgRating_list_by_dish": [
            {
                "_id": "5fc4c8df026424da73e107ae",
                "dish_name": "Cheese Burger",
                "avgRating": 5
            },
            {
                "_id": "5fc4d855026424da73e2f48b",
                "dish_name": "Piza",
                "avgRating": 3.5
            }
        ]
    },
    "message": "Profile Info fetched Successfully"
}
*/
namedRouter.post("api.restaurant.getfeedbacks", '/restaurant/getfeedbacks', request_param.any(), async (req, res) => {
    try {
        const success = await restaurantController.getFeedbacks(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {get} /restaurant/deletephotos/:id/:imagename Restaurant Image Delete
 * @apiGroup Restaurant
 * @apiparam {params} id Restaurant Id
 * @apiparam {params} imagename Restaurant Image Name
 * @apiHeader x-access-token User's Access Token
 * @apiSuccessExample {json} Success
 *{
    "status": 200,
    "data": {
        "first_name": "",
        "last_name": "",
        "email": "res1@yopmail.com",
        "user_name": "",
        "phone": "",
        "password": "$2a$08$SKDAEIM2EyQhNUYDQGxBaOND52Q2CVrTWsrYcWT69J8cVz77glt6C",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "Restaurant 1",
        "restaurant_photos": [
            "1606471495040_brand2.jpg"
        ],
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "deviceToken": null,
        "deviceType": null,
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fc0aa9d0fa0c927ec4589de",
        "role": "5fbfa1b3026424da73720cec",
        "createdAt": "2020-11-27T07:28:29.760Z",
        "updatedAt": "2020-11-27T10:05:31.405Z"
    },
    "message": "Image deleted sucessfully!"
}
*/
namedRouter.get("api.restaurant.deletephotos", '/restaurant/deletephotos/:id/:imagename', request_param.any(), async (req, res) => {
    try {
        const success = await restaurantController.restaurantImgDelete(req, res);
        res.status(success.status).send(success);
    }
    catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /restaurant/changePassword Restaurant Change Password
 * @apiVersion 1.0.0
 * @apiGroup Restaurant
 * @apiParam {string} old_password Old password
 * @apiParam {string} new_password New password
 * @apiHeader x-access-token User's Access token
 * @apiSuccessExample {json} Success
 * {
    "status": 200,
    "data": {
        "first_name": "",
        "last_name": "",
        "email": "res1@yopmail.com",
        "user_name": "",
        "phone": "",
        "password": "$2a$08$AV.G3W6eXGl1mNDz8skk2uMSZe1ZONf7dd8Gqt8bQQtjD0to.TRRa",
        "profile_image": "",
        "verificationCode": "",
        "restaurant_name": "Restaurant 1",
        "restaurant_photos": [
            "1606470332152_brand4.jpg",
            "1606470332158_brand2.jpg"
        ],
        "register_type": "normal",
        "isVerified": false,
        "isDeleted": false,
        "deviceToken": null,
        "deviceType": null,
        "invalidLoginAttempts": 0,
        "isActive": true,
        "_id": "5fc0aa9d0fa0c927ec4589de",
        "role": "5fbfa1b3026424da73720cec",
        "createdAt": "2020-11-27T07:28:29.760Z",
        "updatedAt": "2020-11-27T09:57:00.278Z"
    },
    "message": "Password Changed Successfully."
}
*/
namedRouter.post("api.restaurant.changePassword", '/restaurant/changePassword', request_param.any(), async (req, res) => {
    try {
        const success = await restaurantController.changePassword(req, res);
        res.status(success.status).send(success);
    } catch (error) {
        res.status(error.status).send(error);
    }
});

/**
 * @api {post} /restaurant/transaction/list List of Order
 * @apiVersion 1.0.0
 * @apiParam {String} trans_date (For Filter)
 * @apiParam {String} table_name (For Filter)
 * @apiHeader x-access-token User's Access Token
 * @apiGroup Restaurant
 * @apiSuccessExample {json} Success
 * {
    "data": [
        {
            "_id": "602a66a5026424da73b5ddbd",
            "amount": 9.99,
            "tip_amount": 6.99,
            "transactionId": "A4356SD",
            "description": "",
            "status": "Active",
            "isDeleted": false,
            "user_id": "5fc117e5a227ef1c54731574",
            "restaurant_id": "5fc0aa9d0fa0c927ec4589de",
            "table_id": "5fc78578ed0b4424887c351e",
            "trans_date": "2021-02-08T14:16:28.173Z",
            "createdAt": "2021-02-08T14:16:28.175Z",
            "updatedAt": "2021-02-08T14:16:28.175Z",
            "user": {
                "_id": "5fc117e5a227ef1c54731574",
                "first_name": "test",
                "last_name": "test",
                "email": "testuser2@yopmail.com",
                "user_name": "",
                "phone": "+914343434343",
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
                "deviceToken": "",
                "deviceType": "",
                "invalidLoginAttempts": 0,
                "isActive": true,
                "role": "5fc0d43d026424da739067ed",
                "createdAt": "2020-11-27T15:14:45.297Z",
                "updatedAt": "2020-11-30T09:19:59.656Z",
                "loggedInToken": "286058",
                "isLoggedIn": false
            },
            "restaurant": {
                "_id": "5fc0aa9d0fa0c927ec4589de",
                "first_name": "",
                "last_name": "",
                "email": "res1@yopmail.com",
                "user_name": "",
                "phone": "",
                "password": "$2a$08$bemUuQ29HoaHEt66IZwaHOdNPm9wzest1uS01SSRWKrXYK6u9PC4K",
                "profile_image": "",
                "verificationCode": "",
                "restaurant_name": "Burger 1",
                "restaurant_photos": [
                    "1607377757813_Canva_-_Indian_Buffet_of_Spiced_Dish.jpg"
                ],
                "register_type": "normal",
                "isVerified": false,
                "isDeleted": false,
                "deviceToken": "",
                "deviceType": "",
                "invalidLoginAttempts": 0,
                "isActive": true,
                "role": "5fbfa1b3026424da73720cec",
                "createdAt": "2020-11-27T07:28:29.760Z",
                "updatedAt": "2021-02-15T12:08:17.787Z",
                "restaurant_menu_pdf": "1607952805744_1607377940671_Dinner_Menu2020_web.pdf"
            },
            "table": {
                "_id": "5fc78578ed0b4424887c351e",
                "name": "Table A1",
                "restaurant_id": "5fc0aa9d0fa0c927ec4589de",
                "status": "Active",
                "isDeleted": false,
                "createdAt": "2020-12-02T12:15:52.489Z",
                "updatedAt": "2020-12-02T13:06:58.430Z",
                "__v": 0,
                "seat": [
                    "Seat 1",
                    "Seat 2"
                ]
            }
        }
    ],
    "message": "Order list fetched Successfully"
}
*/
namedRouter.post("api.transaction.list", '/restaurant/transaction/list', transactionController.list);




// Export the express.Router() instance
module.exports = router;