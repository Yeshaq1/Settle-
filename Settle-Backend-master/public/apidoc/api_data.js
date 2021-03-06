define({ "api": [
  {
    "type": "get",
    "url": "/cms/details/:slug",
    "title": "CMS Details",
    "version": "1.0.0",
    "group": "CMS",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"data\": {\n        \"title\": \"Terms\",\n        \"slug\": \"terms\",\n        \"content\": \"<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\\r\\n\",\n        \"isDeleted\": false,\n        \"status\": \"Active\",\n        \"_id\": \"5fbfbbcd026424da73757c36\",\n        \"updatedAt\": \"2020-11-26T14:30:00.515Z\",\n        \"meta_des\": \"<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry.</p>\\r\\n\"\n    },\n    \"message\": \"Cms fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/cms.routes.js",
    "groupTitle": "CMS",
    "name": "GetCmsDetailsSlug"
  },
  {
    "type": "get",
    "url": "/cms/list",
    "title": "List of CMS",
    "version": "1.0.0",
    "group": "CMS",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"data\": [\n        {\n            \"title\": \"Terms\",\n            \"slug\": \"terms\",\n            \"content\": \"<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\\r\\n\",\n            \"isDeleted\": false,\n            \"status\": \"Active\",\n            \"_id\": \"5fbfbbcd026424da73757c36\",\n            \"updatedAt\": \"2020-11-26T14:30:00.515Z\",\n            \"meta_des\": \"<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry.</p>\\r\\n\"\n        }\n    ],\n    \"message\": \"Cms fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/cms.routes.js",
    "groupTitle": "CMS",
    "name": "GetCmsList"
  },
  {
    "type": "post",
    "url": "/dishes_rating/submit",
    "title": "Submit Dishes Rsting/Feedback",
    "version": "1.0.0",
    "group": "Dishes_Rating",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "rating",
            "description": "<p>Dish Rating</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dish_id",
            "description": "<p>Dish Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"data\": {\n        \"dish_id\": \"5fc4c8df026424da73e107ae\",\n        \"user_id\": \"5fc117e5a227ef1c54731574\",\n        \"rating\": 5,\n        \"comment\": \"Awasome\",\n        \"status\": \"Active\",\n        \"isDeleted\": false,\n        \"_id\": \"5fc4cca8e7c8821cb44cdc24\",\n        \"createdAt\": \"2020-11-30T10:42:48.957Z\",\n        \"updatedAt\": \"2020-11-30T10:42:48.957Z\",\n        \"__v\": 0\n    },\n    \"message\": \"Feedback submited Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/dishes_rating.routes.js",
    "groupTitle": "Dishes_Rating",
    "name": "PostDishes_ratingSubmit"
  },
  {
    "type": "get",
    "url": "/restaurant/deletephotos/:id/:imagename",
    "title": "Restaurant Image Delete",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "params",
            "optional": false,
            "field": "id",
            "description": "<p>Restaurant Id</p>"
          },
          {
            "group": "Parameter",
            "type": "params",
            "optional": false,
            "field": "imagename",
            "description": "<p>Restaurant Image Name</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"\",\n        \"last_name\": \"\",\n        \"email\": \"res1@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"\",\n        \"password\": \"$2a$08$SKDAEIM2EyQhNUYDQGxBaOND52Q2CVrTWsrYcWT69J8cVz77glt6C\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"Restaurant 1\",\n        \"restaurant_photos\": [\n            \"1606471495040_brand2.jpg\"\n        ],\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"deviceToken\": null,\n        \"deviceType\": null,\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fc0aa9d0fa0c927ec4589de\",\n        \"role\": \"5fbfa1b3026424da73720cec\",\n        \"createdAt\": \"2020-11-27T07:28:29.760Z\",\n        \"updatedAt\": \"2020-11-27T10:05:31.405Z\"\n    },\n    \"message\": \"Image deleted sucessfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "GetRestaurantDeletephotosIdImagename"
  },
  {
    "type": "get",
    "url": "/restaurant/getprofile",
    "title": "Get Profile",
    "group": "Restaurant",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"\",\n        \"last_name\": \"\",\n        \"email\": \"res1@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"\",\n        \"password\": \"$2a$08$mvB862DKIYJPmStRN7chrexQhP6bRtX1cJ6rQ3H.q9BmrAb.2sxOO\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"Restaurant 1\",\n        \"restaurant_photos\": [\n            \"1606470332152_brand4.jpg\",\n            \"1606470332158_brand2.jpg\"\n        ],\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"deviceToken\": null,\n        \"deviceType\": null,\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fc0aa9d0fa0c927ec4589de\",\n        \"role\": \"5fbfa1b3026424da73720cec\",\n        \"createdAt\": \"2020-11-27T07:28:29.760Z\",\n        \"updatedAt\": \"2020-11-27T09:54:52.256Z\"\n    },\n    \"message\": \"Profile Info fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "GetRestaurantGetprofile"
  },
  {
    "type": "get",
    "url": "/restaurant/logout",
    "title": "Logout",
    "group": "Restaurant",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [],\n    \"isLoggedIn\": false,\n    \"message\": \"Logout successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "GetRestaurantLogout"
  },
  {
    "type": "get",
    "url": "/restaurant/table/:id/",
    "title": "Get Restaurant Table data",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "params",
            "optional": false,
            "field": "id",
            "description": "<p>Restaurant Table Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"table\": {\n            \"name\": \"Table A1\",\n            \"seat\": [\n                \"Seat 1\",\n                \"Seat 2\"\n            ],\n            \"restaurant_id\": \"5fc0aa9d0fa0c927ec4589de\",\n            \"status\": \"Active\",\n            \"isDeleted\": false,\n            \"_id\": \"5fc78578ed0b4424887c351e\",\n            \"createdAt\": \"2020-12-02T12:15:52.489Z\",\n            \"updatedAt\": \"2020-12-02T13:06:58.430Z\",\n            \"__v\": 0\n        },\n        \"restaurant\": {\n            \"first_name\": \"\",\n            \"last_name\": \"\",\n            \"email\": \"res1@yopmail.com\",\n            \"user_name\": \"\",\n            \"phone\": \"\",\n            \"zip_code\": \"\",\n            \"password\": \"$2a$08$SKDAEIM2EyQhNUYDQGxBaOND52Q2CVrTWsrYcWT69J8cVz77glt6C\",\n            \"profile_image\": \"\",\n            \"verificationCode\": \"\",\n            \"restaurant_name\": \"Restaurant 1\",\n            \"restaurant_photos\": [\n                \"1606471495040_brand2.jpg\",\n                \"1606473086364_brand3.png\"\n            ],\n            \"restaurant_menu_pdf\": \"1606484699757_Restaurant_Webapp.pdf\",\n            \"register_type\": \"normal\",\n            \"isVerified\": false,\n            \"isDeleted\": false,\n            \"mobileVerificationCode\": \"\",\n            \"isMobileVerified\": false,\n            \"loggedInToken\": \"\",\n            \"isLoggedIn\": false,\n            \"deviceToken\": null,\n            \"deviceType\": null,\n            \"invalidLoginAttempts\": 0,\n            \"isActive\": true,\n            \"_id\": \"5fc0aa9d0fa0c927ec4589de\",\n            \"role\": \"5fbfa1b3026424da73720cec\",\n            \"createdAt\": \"2020-11-27T07:28:29.760Z\",\n            \"updatedAt\": \"2020-11-30T12:52:22.443Z\"\n        }\n    },\n    \"message\": \"Record fetched successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "GetRestaurantTableId"
  },
  {
    "type": "post",
    "url": "/restaurant/changePassword",
    "title": "Restaurant Change Password",
    "version": "1.0.0",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "old_password",
            "description": "<p>Old password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "new_password",
            "description": "<p>New password</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"\",\n        \"last_name\": \"\",\n        \"email\": \"res1@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"\",\n        \"password\": \"$2a$08$AV.G3W6eXGl1mNDz8skk2uMSZe1ZONf7dd8Gqt8bQQtjD0to.TRRa\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"Restaurant 1\",\n        \"restaurant_photos\": [\n            \"1606470332152_brand4.jpg\",\n            \"1606470332158_brand2.jpg\"\n        ],\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"deviceToken\": null,\n        \"deviceType\": null,\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fc0aa9d0fa0c927ec4589de\",\n        \"role\": \"5fbfa1b3026424da73720cec\",\n        \"createdAt\": \"2020-11-27T07:28:29.760Z\",\n        \"updatedAt\": \"2020-11-27T09:57:00.278Z\"\n    },\n    \"message\": \"Password Changed Successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "PostRestaurantChangepassword"
  },
  {
    "type": "post",
    "url": "/restaurant/forgot-password",
    "title": "Forgot Password",
    "version": "1.0.0",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {},\n    \"message\": \"A reset password link has been sent to your email.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "PostRestaurantForgotPassword"
  },
  {
    "type": "post",
    "url": "/restaurant/getfeedbacks",
    "title": "Get Feedbacks",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_date",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_date",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "rating",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"restaurent_feedback_list\": [\n            {\n                \"_id\": \"5fc4c3162b67cd1c20c0ce06\",\n                \"user\": {\n                    \"_id\": \"5fc117e5a227ef1c54731574\",\n                    \"first_name\": \"test\",\n                    \"last_name\": \"test\",\n                    \"email\": \"testuser2@yopmail.com\",\n                    \"user_name\": \"\",\n                    \"phone\": \"+919563743580\",\n                    \"zip_code\": \"12345\",\n                    \"password\": \"\",\n                    \"profile_image\": \"\",\n                    \"verificationCode\": \"\",\n                    \"restaurant_name\": \"\",\n                    \"restaurant_photos\": [],\n                    \"restaurant_menu_pdf\": \"\",\n                    \"register_type\": \"normal\",\n                    \"isVerified\": false,\n                    \"isDeleted\": false,\n                    \"mobileVerificationCode\": \"270943\",\n                    \"isMobileVerified\": false,\n                    \"deviceToken\": \"\",\n                    \"deviceType\": \"\",\n                    \"invalidLoginAttempts\": 0,\n                    \"isActive\": true,\n                    \"role\": \"5fc0d43d026424da739067ed\",\n                    \"createdAt\": \"2020-11-27T15:14:45.297Z\",\n                    \"updatedAt\": \"2020-11-30T09:19:59.656Z\",\n                    \"loggedInToken\": \"286058\",\n                    \"isLoggedIn\": false\n                },\n                \"comment\": \"Good\",\n                \"food\": 4,\n                \"service\": 3,\n                \"ambiance\": 1,\n                \"createdAt\": \"2020-11-30T10:01:58.043Z\"\n            },\n            {\n                \"_id\": \"5fc4c5082b67cd1c20c0ce07\",\n                \"user\": {\n                    \"_id\": \"5fc117e5a227ef1c54731574\",\n                    \"first_name\": \"test\",\n                    \"last_name\": \"test\",\n                    \"email\": \"testuser2@yopmail.com\",\n                    \"user_name\": \"\",\n                    \"phone\": \"+919563743580\",\n                    \"zip_code\": \"12345\",\n                    \"password\": \"\",\n                    \"profile_image\": \"\",\n                    \"verificationCode\": \"\",\n                    \"restaurant_name\": \"\",\n                    \"restaurant_photos\": [],\n                    \"restaurant_menu_pdf\": \"\",\n                    \"register_type\": \"normal\",\n                    \"isVerified\": false,\n                    \"isDeleted\": false,\n                    \"mobileVerificationCode\": \"270943\",\n                    \"isMobileVerified\": false,\n                    \"deviceToken\": \"\",\n                    \"deviceType\": \"\",\n                    \"invalidLoginAttempts\": 0,\n                    \"isActive\": true,\n                    \"role\": \"5fc0d43d026424da739067ed\",\n                    \"createdAt\": \"2020-11-27T15:14:45.297Z\",\n                    \"updatedAt\": \"2020-11-30T09:19:59.656Z\",\n                    \"loggedInToken\": \"286058\",\n                    \"isLoggedIn\": false\n                },\n                \"comment\": \"Awasome\",\n                \"food\": 5,\n                \"service\": 5,\n                \"ambiance\": 4,\n                \"createdAt\": \"2020-11-30T10:10:16.279Z\"\n            }\n        ],\n        \"avgRating_restaurent\": [\n            {\n                \"_id\": null,\n                \"avgFoodRating\": 4.5,\n                \"avgServiceRating\": 4,\n                \"avgAmbianceRating\": 2.5\n            }\n        ],\n        \"dishes_feedback_list\": [\n            {\n                \"_id\": \"5fc4cca8e7c8821cb44cdc24\",\n                \"dish_id\": \"5fc4c8df026424da73e107ae\",\n                \"user_id\": \"5fc117e5a227ef1c54731574\",\n                \"rating\": 5,\n                \"comment\": \"Awasome\",\n                \"status\": \"Active\",\n                \"isDeleted\": false,\n                \"createdAt\": \"2020-11-30T10:42:48.957Z\",\n                \"updatedAt\": \"2020-11-30T10:42:48.957Z\",\n                \"__v\": 0,\n                \"dishes\": {\n                    \"_id\": \"5fc4c8df026424da73e107ae\",\n                    \"restaurant_id\": \"5fc0aa9d0fa0c927ec4589de\",\n                    \"name\": \"Cheese Burger\",\n                    \"status\": \"Active\",\n                    \"isDeleted\": false,\n                    \"price\": 40,\n                    \"createdAt\": \"2020-11-30T10:01:58.043Z\",\n                    \"updatedAt\": \"2020-11-30T10:01:58.043Z\",\n                    \"__v\": 0\n                },\n                \"users\": {\n                    \"_id\": \"5fc117e5a227ef1c54731574\",\n                    \"first_name\": \"test\",\n                    \"last_name\": \"test\",\n                    \"email\": \"testuser2@yopmail.com\",\n                    \"user_name\": \"\",\n                    \"phone\": \"+919563743580\",\n                    \"zip_code\": \"12345\",\n                    \"password\": \"\",\n                    \"profile_image\": \"\",\n                    \"verificationCode\": \"\",\n                    \"restaurant_name\": \"\",\n                    \"restaurant_photos\": [],\n                    \"restaurant_menu_pdf\": \"\",\n                    \"register_type\": \"normal\",\n                    \"isVerified\": false,\n                    \"isDeleted\": false,\n                    \"mobileVerificationCode\": \"270943\",\n                    \"isMobileVerified\": false,\n                    \"deviceToken\": \"\",\n                    \"deviceType\": \"\",\n                    \"invalidLoginAttempts\": 0,\n                    \"isActive\": true,\n                    \"role\": \"5fc0d43d026424da739067ed\",\n                    \"createdAt\": \"2020-11-27T15:14:45.297Z\",\n                    \"updatedAt\": \"2020-11-30T09:19:59.656Z\",\n                    \"loggedInToken\": \"286058\",\n                    \"isLoggedIn\": false\n                }\n            },\n            {\n                \"_id\": \"5fc4d87a4ce8c61b00e89785\",\n                \"dish_id\": \"5fc4d855026424da73e2f48b\",\n                \"user_id\": \"5fc117e5a227ef1c54731574\",\n                \"rating\": 4,\n                \"comment\": \"Good\",\n                \"status\": \"Active\",\n                \"isDeleted\": false,\n                \"createdAt\": \"2020-11-30T11:33:14.960Z\",\n                \"updatedAt\": \"2020-11-30T11:33:14.960Z\",\n                \"__v\": 0,\n                \"dishes\": {\n                    \"_id\": \"5fc4d855026424da73e2f48b\",\n                    \"restaurant_id\": \"5fc0aa9d0fa0c927ec4589de\",\n                    \"name\": \"Piza\",\n                    \"status\": \"Active\",\n                    \"isDeleted\": false,\n                    \"price\": 50,\n                    \"createdAt\": \"2020-11-30T10:01:58.043Z\",\n                    \"updatedAt\": \"2020-11-30T10:01:58.043Z\",\n                    \"__v\": 0\n                },\n                \"users\": {\n                    \"_id\": \"5fc117e5a227ef1c54731574\",\n                    \"first_name\": \"test\",\n                    \"last_name\": \"test\",\n                    \"email\": \"testuser2@yopmail.com\",\n                    \"user_name\": \"\",\n                    \"phone\": \"+919563743580\",\n                    \"zip_code\": \"12345\",\n                    \"password\": \"\",\n                    \"profile_image\": \"\",\n                    \"verificationCode\": \"\",\n                    \"restaurant_name\": \"\",\n                    \"restaurant_photos\": [],\n                    \"restaurant_menu_pdf\": \"\",\n                    \"register_type\": \"normal\",\n                    \"isVerified\": false,\n                    \"isDeleted\": false,\n                    \"mobileVerificationCode\": \"270943\",\n                    \"isMobileVerified\": false,\n                    \"deviceToken\": \"\",\n                    \"deviceType\": \"\",\n                    \"invalidLoginAttempts\": 0,\n                    \"isActive\": true,\n                    \"role\": \"5fc0d43d026424da739067ed\",\n                    \"createdAt\": \"2020-11-27T15:14:45.297Z\",\n                    \"updatedAt\": \"2020-11-30T09:19:59.656Z\",\n                    \"loggedInToken\": \"286058\",\n                    \"isLoggedIn\": false\n                }\n            },\n            {\n                \"_id\": \"5fc4d9924ce8c61b00e89786\",\n                \"dish_id\": \"5fc4d855026424da73e2f48b\",\n                \"user_id\": \"5fc117e5a227ef1c54731574\",\n                \"rating\": 3,\n                \"comment\": \"Good\",\n                \"status\": \"Active\",\n                \"isDeleted\": false,\n                \"createdAt\": \"2020-11-30T11:37:54.118Z\",\n                \"updatedAt\": \"2020-11-30T11:37:54.118Z\",\n                \"__v\": 0,\n                \"dishes\": {\n                    \"_id\": \"5fc4d855026424da73e2f48b\",\n                    \"restaurant_id\": \"5fc0aa9d0fa0c927ec4589de\",\n                    \"name\": \"Piza\",\n                    \"status\": \"Active\",\n                    \"isDeleted\": false,\n                    \"price\": 50,\n                    \"createdAt\": \"2020-11-30T10:01:58.043Z\",\n                    \"updatedAt\": \"2020-11-30T10:01:58.043Z\",\n                    \"__v\": 0\n                },\n                \"users\": {\n                    \"_id\": \"5fc117e5a227ef1c54731574\",\n                    \"first_name\": \"test\",\n                    \"last_name\": \"test\",\n                    \"email\": \"testuser2@yopmail.com\",\n                    \"user_name\": \"\",\n                    \"phone\": \"+919563743580\",\n                    \"zip_code\": \"12345\",\n                    \"password\": \"\",\n                    \"profile_image\": \"\",\n                    \"verificationCode\": \"\",\n                    \"restaurant_name\": \"\",\n                    \"restaurant_photos\": [],\n                    \"restaurant_menu_pdf\": \"\",\n                    \"register_type\": \"normal\",\n                    \"isVerified\": false,\n                    \"isDeleted\": false,\n                    \"mobileVerificationCode\": \"270943\",\n                    \"isMobileVerified\": false,\n                    \"deviceToken\": \"\",\n                    \"deviceType\": \"\",\n                    \"invalidLoginAttempts\": 0,\n                    \"isActive\": true,\n                    \"role\": \"5fc0d43d026424da739067ed\",\n                    \"createdAt\": \"2020-11-27T15:14:45.297Z\",\n                    \"updatedAt\": \"2020-11-30T09:19:59.656Z\",\n                    \"loggedInToken\": \"286058\",\n                    \"isLoggedIn\": false\n                }\n            }\n        ],\n        \"avgRating_list_by_dish\": [\n            {\n                \"_id\": \"5fc4c8df026424da73e107ae\",\n                \"dish_name\": \"Cheese Burger\",\n                \"avgRating\": 5\n            },\n            {\n                \"_id\": \"5fc4d855026424da73e2f48b\",\n                \"dish_name\": \"Piza\",\n                \"avgRating\": 3.5\n            }\n        ]\n    },\n    \"message\": \"Profile Info fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "PostRestaurantGetfeedbacks"
  },
  {
    "type": "post",
    "url": "/restaurant/login",
    "title": "Restaurant SignIn",
    "version": "1.0.0",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "deviceToken",
            "description": "<p>Device Token</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "deviceType",
            "description": "<p>Device Type[ios/android]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzBhYTlkMGZhMGM5MjdlYzQ1ODlkZSIsImlhdCI6MTYwNjQ3MDQwMCwiZXhwIjoxNjA2NTU2ODAwfQ.ZgVsRtp17MheybyG-cdzG-zPARlEn-rUGVJnZ8T-O5M\",\n    \"loggedIn\": true,\n    \"data\": {\n        \"first_name\": \"\",\n        \"last_name\": \"\",\n        \"email\": \"res1@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"\",\n        \"password\": \"$2a$08$BY8QaIy43N3dKxe5w5IUROs48KBt1YArP1a76a2PnRHkCZjHJyvY2\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"Restaurant 1\",\n        \"restaurant_photos\": [\n            \"1606470332152_brand4.jpg\",\n            \"1606470332158_brand2.jpg\"\n        ],\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"deviceToken\": null,\n        \"deviceType\": null,\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fc0aa9d0fa0c927ec4589de\",\n        \"role\": {\n            \"rolegroup\": \"backend\",\n            \"desc\": \"Restaurant of the application.\",\n            \"_id\": \"5fbfa1b3026424da73720cec\",\n            \"roleDisplayName\": \"Restaurant\",\n            \"role\": \"restaurant\",\n            \"id\": \"5fbfa1b3026424da73720cec\"\n        },\n        \"createdAt\": \"2020-11-27T07:28:29.760Z\",\n        \"updatedAt\": \"2020-11-27T09:45:32.750Z\"\n    },\n    \"user_type\": \"restaurant\",\n    \"message\": \"You have successfully logged in.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "PostRestaurantLogin"
  },
  {
    "type": "post",
    "url": "/restaurant/profile/update",
    "title": "Restaurant Profile Update",
    "version": "1.0.0",
    "group": "Restaurant",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "restaurant_name",
            "description": "<p>Restaurant Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "restaurant_photos",
            "description": "<p>restaurant photos</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "restaurant_menu_pdf",
            "description": "<p>restaurant menu pdf</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"status\": 200,\n  \"data\": {\n      \"first_name\": \"testc1\",\n      \"last_name\": \"test\",\n      \"email\": \"testc1@yopmail.com\",\n      \"phone\": \"9898989898\",\n      \"password\": \"$2a$08$/yUIzWcFUicxSn9IyNmxIewxyWoJRstPi6IJ2ieCq.ttLM4d8TjXu\",\n      \"bio\": \"<p>bio</p>\\r\\n\",\n      \"address\": \"test addr\",\n      \"profile_image\": \"1601368381650_profileImage_1580380248488_0i1XbVjul86E_CSyf.jpg.jpg\",\n      \"verificationCode\": \"\",\n      \"register_type\": \"normal\",\n      \"isVerified\": true,\n      \"isDeleted\": false,\n      \"deviceToken\": \"\",\n      \"deviceType\": \"android\",\n      \"isActive\": true,\n      \"_id\": \"5f72d3191ba61e2600e27b78\",\n      \"role\": \"5f6de0d6d29cd33b67e73884\",\n      \"createdAt\": \"2020-09-29T06:24:25.928Z\",\n      \"updatedAt\": \"2020-09-29T14:54:04.183Z\"\n  },\n  \"message\": \"User details updated successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "PostRestaurantProfileUpdate"
  },
  {
    "type": "post",
    "url": "/restaurant/resetPassword/:code",
    "title": "Restaurant Reset Password",
    "version": "1.0.0",
    "group": "Restaurant",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "params",
            "optional": false,
            "field": "code",
            "description": "<p>Reset Code</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Reset Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"\",\n        \"last_name\": \"\",\n        \"email\": \"res1@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"\",\n        \"password\": \"$2a$08$Hp0PrEAjGdbfMTSYeoyot.25IEH1/8HHKJ.v6vhkmsEQ8YjkZD8Ku\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"Restaurant 1\",\n        \"restaurant_photos\": [\n            \"1606470332152_brand4.jpg\",\n            \"1606470332158_brand2.jpg\"\n        ],\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"deviceToken\": null,\n        \"deviceType\": null,\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fc0aa9d0fa0c927ec4589de\",\n        \"role\": \"5fbfa1b3026424da73720cec\",\n        \"createdAt\": \"2020-11-27T07:28:29.760Z\",\n        \"updatedAt\": \"2020-11-27T09:53:27.332Z\"\n    },\n    \"message\": \"Password Changed Successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "PostRestaurantResetpasswordCode"
  },
  {
    "type": "post",
    "url": "/restaurant/transaction/list",
    "title": "List of Order",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trans_date",
            "description": "<p>(For Filter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>(For Filter)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "group": "Restaurant",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"data\": [\n        {\n            \"_id\": \"602a66a5026424da73b5ddbd\",\n            \"amount\": 9.99,\n            \"tip_amount\": 6.99,\n            \"transactionId\": \"A4356SD\",\n            \"description\": \"\",\n            \"status\": \"Active\",\n            \"isDeleted\": false,\n            \"user_id\": \"5fc117e5a227ef1c54731574\",\n            \"restaurant_id\": \"5fc0aa9d0fa0c927ec4589de\",\n            \"table_id\": \"5fc78578ed0b4424887c351e\",\n            \"trans_date\": \"2021-02-08T14:16:28.173Z\",\n            \"createdAt\": \"2021-02-08T14:16:28.175Z\",\n            \"updatedAt\": \"2021-02-08T14:16:28.175Z\",\n            \"user\": {\n                \"_id\": \"5fc117e5a227ef1c54731574\",\n                \"first_name\": \"test\",\n                \"last_name\": \"test\",\n                \"email\": \"testuser2@yopmail.com\",\n                \"user_name\": \"\",\n                \"phone\": \"+914343434343\",\n                \"zip_code\": \"12345\",\n                \"password\": \"\",\n                \"profile_image\": \"\",\n                \"verificationCode\": \"\",\n                \"restaurant_name\": \"\",\n                \"restaurant_photos\": [],\n                \"restaurant_menu_pdf\": \"\",\n                \"register_type\": \"normal\",\n                \"isVerified\": false,\n                \"isDeleted\": false,\n                \"mobileVerificationCode\": \"270943\",\n                \"isMobileVerified\": false,\n                \"deviceToken\": \"\",\n                \"deviceType\": \"\",\n                \"invalidLoginAttempts\": 0,\n                \"isActive\": true,\n                \"role\": \"5fc0d43d026424da739067ed\",\n                \"createdAt\": \"2020-11-27T15:14:45.297Z\",\n                \"updatedAt\": \"2020-11-30T09:19:59.656Z\",\n                \"loggedInToken\": \"286058\",\n                \"isLoggedIn\": false\n            },\n            \"restaurant\": {\n                \"_id\": \"5fc0aa9d0fa0c927ec4589de\",\n                \"first_name\": \"\",\n                \"last_name\": \"\",\n                \"email\": \"res1@yopmail.com\",\n                \"user_name\": \"\",\n                \"phone\": \"\",\n                \"password\": \"$2a$08$bemUuQ29HoaHEt66IZwaHOdNPm9wzest1uS01SSRWKrXYK6u9PC4K\",\n                \"profile_image\": \"\",\n                \"verificationCode\": \"\",\n                \"restaurant_name\": \"Burger 1\",\n                \"restaurant_photos\": [\n                    \"1607377757813_Canva_-_Indian_Buffet_of_Spiced_Dish.jpg\"\n                ],\n                \"register_type\": \"normal\",\n                \"isVerified\": false,\n                \"isDeleted\": false,\n                \"deviceToken\": \"\",\n                \"deviceType\": \"\",\n                \"invalidLoginAttempts\": 0,\n                \"isActive\": true,\n                \"role\": \"5fbfa1b3026424da73720cec\",\n                \"createdAt\": \"2020-11-27T07:28:29.760Z\",\n                \"updatedAt\": \"2021-02-15T12:08:17.787Z\",\n                \"restaurant_menu_pdf\": \"1607952805744_1607377940671_Dinner_Menu2020_web.pdf\"\n            },\n            \"table\": {\n                \"_id\": \"5fc78578ed0b4424887c351e\",\n                \"name\": \"Table A1\",\n                \"restaurant_id\": \"5fc0aa9d0fa0c927ec4589de\",\n                \"status\": \"Active\",\n                \"isDeleted\": false,\n                \"createdAt\": \"2020-12-02T12:15:52.489Z\",\n                \"updatedAt\": \"2020-12-02T13:06:58.430Z\",\n                \"__v\": 0,\n                \"seat\": [\n                    \"Seat 1\",\n                    \"Seat 2\"\n                ]\n            }\n        }\n    ],\n    \"message\": \"Order list fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/restaurant.routes.js",
    "groupTitle": "Restaurant",
    "name": "PostRestaurantTransactionList"
  },
  {
    "type": "post",
    "url": "/restaurant_rating/submit",
    "title": "Submit Resturent Rsting/Feedback",
    "version": "1.0.0",
    "group": "Restaurant_Rating",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "food",
            "description": "<p>Food Rating</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "service",
            "description": "<p>Service Rating</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "ambiance",
            "description": "<p>Ambiance Rating</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "restaurant_id",
            "description": "<p>Restaurant Id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"data\": {\n        \"restaurant_id\": \"5fc0aa9d0fa0c927ec4589de\",\n        \"user_id\": \"5fc117e5a227ef1c54731574\",\n        \"comment\": \"Good\",\n        \"status\": \"Active\",\n        \"isDeleted\": false,\n        \"_id\": \"5fc4c3162b67cd1c20c0ce06\",\n        \"food\": 4,\n        \"service\": 3,\n        \"ambiance\": 1,\n        \"createdAt\": \"2020-11-30T10:01:58.043Z\",\n        \"updatedAt\": \"2020-11-30T10:01:58.043Z\",\n        \"__v\": 0\n    },\n    \"message\": \"Feedback submited Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/restaurant_rating.routes.js",
    "groupTitle": "Restaurant_Rating",
    "name": "PostRestaurant_ratingSubmit"
  },
  {
    "type": "get",
    "url": "/userWebApp/getprofile",
    "title": "Users Profile",
    "version": "1.0.0",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"Subhadip\",\n        \"last_name\": \"Patra\",\n        \"email\": \"test.sqr10@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"+919563743580\",\n        \"zip_code\": \"\",\n        \"password\": \"\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"\",\n        \"restaurant_photos\": [],\n        \"restaurant_menu_pdf\": \"\",\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"mobileVerificationCode\": \"466947\",\n        \"isMobileVerified\": true,\n        \"loggedInToken\": \"312555\",\n        \"isLoggedIn\": true,\n        \"deviceToken\": \"\",\n        \"deviceType\": \"android\",\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fce6388f9d742f641f6c462\",\n        \"role\": \"5fc0d43d026424da739067ed\",\n        \"createdAt\": \"2020-12-07T17:16:56.118Z\",\n        \"updatedAt\": \"2020-12-08T09:59:24.949Z\"\n    },\n    \"message\": \"Profile Info fetched Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user-app.routes.js",
    "groupTitle": "User",
    "name": "GetUserwebappGetprofile"
  },
  {
    "type": "get",
    "url": "/userWebApp/logout",
    "title": "Logout",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": [],\n    \"isLoggedIn\": false,\n    \"message\": \"Logout successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/api/user-app.routes.js",
    "groupTitle": "User",
    "name": "GetUserwebappLogout"
  },
  {
    "type": "post",
    "url": "/userWebApp/login",
    "title": "User SignIn",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {},\n    \"message\": \"A 6 digit verification code has been sent to your email/phone.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user-app.routes.js",
    "groupTitle": "User",
    "name": "PostUserwebappLogin"
  },
  {
    "type": "post",
    "url": "/userWebApp/profile/update",
    "title": "Update Profile",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User's Access Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"Subhadip\",\n        \"last_name\": \"Patra\",\n        \"email\": \"test.sqr10@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"+919563743580\",\n        \"zip_code\": \"\",\n        \"password\": \"\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"\",\n        \"restaurant_photos\": [],\n        \"restaurant_menu_pdf\": \"\",\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"mobileVerificationCode\": \"288506\",\n        \"isMobileVerified\": false,\n        \"loggedInToken\": \"312555\",\n        \"isLoggedIn\": true,\n        \"deviceToken\": \"\",\n        \"deviceType\": \"android\",\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fce6388f9d742f641f6c462\",\n        \"role\": \"5fc0d43d026424da739067ed\",\n        \"createdAt\": \"2020-12-07T17:16:56.118Z\",\n        \"updatedAt\": \"2020-12-08T11:46:57.786Z\"\n    },\n    \"message\": \"Restaurant details updated successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user-app.routes.js",
    "groupTitle": "User",
    "name": "PostUserwebappProfileUpdate"
  },
  {
    "type": "post",
    "url": "/userWebApp/signup",
    "title": "User Register",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "zip_code",
            "description": "<p>Postal Code</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "card_number",
            "description": "<p>Card Number</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "exp_month",
            "description": "<p>Card exp_month</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "exp_year",
            "description": "<p>Card exp_year</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "cvv",
            "description": "<p>Card cvv</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"test\",\n        \"last_name\": \"test\",\n        \"email\": \"testuser2@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"1212121212\",\n        \"zip_code\": \"12345\",\n        \"password\": \"\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"\",\n        \"restaurant_photos\": [],\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"deviceToken\": \"\",\n        \"deviceType\": \"android\",\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fc0ed2e906b53066c7644e6\",\n        \"role\": \"5fc0d43d026424da739067ed\",\n        \"createdAt\": \"2020-11-27T12:12:30.067Z\",\n        \"updatedAt\": \"2020-11-27T12:12:30.067Z\"\n    },\n    \"message\": \"Registered successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user-app.routes.js",
    "groupTitle": "User",
    "name": "PostUserwebappSignup"
  },
  {
    "type": "post",
    "url": "/userWebApp/verifyLogin",
    "title": "User SignIn verify code",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>Verify Code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"loggedIn\": true,\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYzExN2U1YTIyN2VmMWM1NDczMTU3NCIsImlhdCI6MTYwNjcyNDY4MiwiZXhwIjoxNjA2ODExMDgyfQ.97sFENUVsSDkPv2teIeKVg4mIGKHLZsiYPpEOhmec-Q\",\n    \"data\": {\n        \"first_name\": \"test\",\n        \"last_name\": \"test\",\n        \"email\": \"testuser2@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"+919563743580\",\n        \"zip_code\": \"12345\",\n        \"password\": \"\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"\",\n        \"restaurant_photos\": [],\n        \"restaurant_menu_pdf\": \"\",\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"mobileVerificationCode\": \"270943\",\n        \"isMobileVerified\": false,\n        \"loggedInToken\": \"552547\",\n        \"isLoggedIn\": true,\n        \"deviceToken\": \"\",\n        \"deviceType\": \"android\",\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fc117e5a227ef1c54731574\",\n        \"role\": {\n            \"rolegroup\": \"backend\",\n            \"desc\": \"User of the application.\",\n            \"_id\": \"5fc0d43d026424da739067ed\",\n            \"roleDisplayName\": \"User\",\n            \"role\": \"user\",\n            \"id\": \"5fc0d43d026424da739067ed\"\n        },\n        \"createdAt\": \"2020-11-27T15:14:45.297Z\",\n        \"updatedAt\": \"2020-11-30T08:14:07.542Z\"\n    },\n    \"user_type\": \"user\",\n    \"message\": \"You have successfully logged in.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user-app.routes.js",
    "groupTitle": "User",
    "name": "PostUserwebappVerifylogin"
  },
  {
    "type": "post",
    "url": "/userWebApp/verifyPhone",
    "title": "User verify Phone",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "phone",
            "description": "<p>Phone</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>Verify Code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n    \"status\": 200,\n    \"data\": {\n        \"first_name\": \"test\",\n        \"last_name\": \"test\",\n        \"email\": \"testuser2@yopmail.com\",\n        \"user_name\": \"\",\n        \"phone\": \"+919563743580\",\n        \"zip_code\": \"12345\",\n        \"password\": \"\",\n        \"profile_image\": \"\",\n        \"verificationCode\": \"\",\n        \"restaurant_name\": \"\",\n        \"restaurant_photos\": [],\n        \"restaurant_menu_pdf\": \"\",\n        \"register_type\": \"normal\",\n        \"isVerified\": false,\n        \"isDeleted\": false,\n        \"mobileVerificationCode\": \"270943\",\n        \"isMobileVerified\": true,\n        \"loggedInToken\": \"286058\",\n        \"isLoggedIn\": false,\n        \"deviceToken\": \"\",\n        \"deviceType\": \"\",\n        \"invalidLoginAttempts\": 0,\n        \"isActive\": true,\n        \"_id\": \"5fc117e5a227ef1c54731574\",\n        \"role\": \"5fc0d43d026424da739067ed\",\n        \"createdAt\": \"2020-11-27T15:14:45.297Z\",\n        \"updatedAt\": \"2020-12-07T12:26:02.033Z\"\n    },\n    \"user_type\": \"user\",\n    \"message\": \"This phone number has been verified successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/api/user-app.routes.js",
    "groupTitle": "User",
    "name": "PostUserwebappVerifyphone"
  }
] });
