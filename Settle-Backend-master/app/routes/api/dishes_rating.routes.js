const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const dishes_ratingController = require('webservice/dishes_rating.controller');
const multer = require('multer');
const request_param = multer();

namedRouter.all('/dishes_rating*', auth.authenticateAPI);
/**
 * @api {post} /dishes_rating/submit Submit Dishes Rsting/Feedback
 * @apiVersion 1.0.0
 * @apiGroup Dishes Rating
 * @apiParam {number}  rating Dish Rating
 * @apiParam {string}  comment Comment
 * @apiParam {string}  dish_id Dish Id
 * @apiHeader x-access-token User's Access Token
 * @apiSuccessExample {json} Success
 * {
    "data": {
        "dish_id": "5fc4c8df026424da73e107ae",
        "user_id": "5fc117e5a227ef1c54731574",
        "rating": 5,
        "comment": "Awasome",
        "status": "Active",
        "isDeleted": false,
        "_id": "5fc4cca8e7c8821cb44cdc24",
        "createdAt": "2020-11-30T10:42:48.957Z",
        "updatedAt": "2020-11-30T10:42:48.957Z",
        "__v": 0
    },
    "message": "Feedback submited Successfully"
}
*/
namedRouter.post("api.dishes_rating.submit", '/dishes_rating/submit', dishes_ratingController.save);


// Export the express.Router() instance
module.exports = router;