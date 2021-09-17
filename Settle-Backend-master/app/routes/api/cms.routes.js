const express = require('express');
const routeLabel = require('route-label');
const router = express.Router();
const namedRouter = routeLabel(router);
const cmsController = require('webservice/cms.controller');
const multer = require('multer');
const request_param = multer();

/**
 * @api {get} /cms/list List of CMS
 * @apiVersion 1.0.0
 * @apiGroup CMS
 * @apiSuccessExample {json} Success
 * {
    "data": [
        {
            "title": "Terms",
            "slug": "terms",
            "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
            "isDeleted": false,
            "status": "Active",
            "_id": "5fbfbbcd026424da73757c36",
            "updatedAt": "2020-11-26T14:30:00.515Z",
            "meta_des": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry.</p>\r\n"
        }
    ],
    "message": "Cms fetched Successfully"
}
*/
namedRouter.get("api.cms.list", '/cms/list', cmsController.list);

/**
 * @api {get} /cms/details/:slug CMS Details
 * @apiVersion 1.0.0
 * @apiGroup CMS
 * @apiSuccessExample {json} Success
 * {
    "data": {
        "title": "Terms",
        "slug": "terms",
        "content": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n",
        "isDeleted": false,
        "status": "Active",
        "_id": "5fbfbbcd026424da73757c36",
        "updatedAt": "2020-11-26T14:30:00.515Z",
        "meta_des": "<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry.</p>\r\n"
    },
    "message": "Cms fetched Successfully"
}
*/
namedRouter.get("api.cms.details", '/cms/details/:slug', cmsController.details);


// Export the express.Router() instance
module.exports = router;