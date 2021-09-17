const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const restaurant_ratingController = require('webservice/restaurant_rating.controller');
const multer = require('multer');
const request_param = multer();

namedRouter.all('/restaurant_rating*', auth.authenticateAPI);
/**
 * @api {post} /restaurant_rating/submit Submit Resturent Rsting/Feedback
 * @apiVersion 1.0.0
 * @apiGroup Restaurant Rating
 * @apiParam {number}  food Food Rating
 * @apiParam {number}  service Service Rating
 * @apiParam {number}  ambiance Ambiance Rating
 * @apiParam {string}  comment Comment
 * @apiParam {string}  restaurant_id Restaurant Id
 * @apiHeader x-access-token User's Access Token
 * @apiSuccessExample {json} Success
 * {
    "data": {
        "restaurant_id": "5fc0aa9d0fa0c927ec4589de",
        "user_id": "5fc117e5a227ef1c54731574",
        "comment": "Good",
        "status": "Active",
        "isDeleted": false,
        "_id": "5fc4c3162b67cd1c20c0ce06",
        "food": 4,
        "service": 3,
        "ambiance": 1,
        "createdAt": "2020-11-30T10:01:58.043Z",
        "updatedAt": "2020-11-30T10:01:58.043Z",
        "__v": 0
    },
    "message": "Feedback submited Successfully"
}
*/
namedRouter.post("api.restaurant_rating.submit", '/restaurant_rating/submit', restaurant_ratingController.save);


// Export the express.Router() instance
module.exports = router;