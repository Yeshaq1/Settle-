const mongoose = require('mongoose');
const Restaurant_rating = require('restaurant_rating/models/restaurant_rating.model');
const perPage = config.PAGINATION_PERPAGE;

const restaurant_ratingRepository = {
    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });
            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                //and_clauses.push({"status": /req.body.query.generalSearch/i});
                and_clauses.push({
                    $or: [
                        { 'name': { $regex: req.body.query.generalSearch, $options: 'i' } }
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({ "status": req.body.query.Status });
            }
            conditions['$and'] = and_clauses;
            var sortOperator = { "$sort": {} };
            if (_.has(req.body, 'sort')) {
                var sortField = req.body.sort.field;
                if (req.body.sort.sort == 'desc') {
                    var sortOrder = -1;
                }
                else if (req.body.sort.sort == 'asc') {
                    var sortOrder = 1;
                }
                sortOperator["$sort"][sortField] = sortOrder;
            }
            else {
                sortOperator["$sort"]['_id'] = -1;
            }
            var aggregate = Restaurant_rating.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allRestaurant_ratings = await Restaurant_rating.aggregatePaginate(aggregate, options);
            return allRestaurant_ratings;
        }
        catch (e) {
            throw (e);
        }
    },

    getAllCategories: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "status": 'Active', "isDeleted": false });
            if (_.isObject(req.params) && _.has(req.params, 'keyword')) {
                and_clauses.push({
                    $or: [
                        { 'name': { $regex: req.params.keyword, $options: 'i' } }
                    ]
                });
            }
            conditions['$and'] = and_clauses;

            var result = await Restaurant_rating.aggregate([
                { $match: conditions },
                //{$sort : { price : 1 }}
                { $sort: { name: 1 } }
            ]);

            //console.log("result>>",result);

            return result;
        }
        catch (e) {
            throw (e);
        }
    },

    getRestaurant_ratingCount: async (params) => {
        try {

            let restaurant_rating = await Restaurant_rating.countDocuments(params);
            return restaurant_rating;
        }
        catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let restaurant_ratings = await Restaurant_rating.findById(id).exec();
            return restaurant_ratings;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let restaurant_ratings = await Restaurant_rating.findOne(params).exec();
            return restaurant_ratings;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let restaurant_ratings = await Restaurant_rating.find(params).exec();
            return restaurant_ratings;
        } catch (e) {
            throw (e);
        }
    },

    getAllByFieldRestaurentAPI: async (req) => {
        try {

            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });
            and_clauses.push({ "status": "Active" });
            and_clauses.push({ "restaurant_id": mongoose.Types.ObjectId(req.user._id) });

            conditions['$and'] = and_clauses;

            var aggregate = Restaurant_rating.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                { $unwind: "$users" },
                { $match: conditions },
                {
                    $group:
                    {
                        _id: null,
                        avgFoodRating: { $avg: "$food" },
                        avgServiceRating: { $avg: "$service" },
                        avgAmbianceRating: { $avg: "$ambiance" }

                    }
                },

            ]);

            return aggregate

        } catch (e) {
            throw (e);
        }
    },

    getAllByFieldRestaurentAPI2: async (req) => {
        try {

            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });
            and_clauses.push({ "status": "Active" });
            if (req.body.start_date && req.body.start_date != "" && req.body.end_date != "") {
                and_clauses.push({ "createdAt": { $gte: new Date(req.body.start_date), $lte: new Date(req.body.end_date) } });
            }
            if (req.body.rating && req.body.rating.length > 0) {
                and_clauses.push({ "avg_rating": { $in: req.body.rating } });

            }

            and_clauses.push({ "restaurant_id": mongoose.Types.ObjectId(req.user._id) });

            conditions['$and'] = and_clauses;

            var aggregate = Restaurant_rating.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                { $unwind: "$users" },
                { $match: conditions },
                {
                    $group:
                    {
                        _id: "$_id",
                        user: { $first: "$users" },
                        comment: { $first: "$comment" },
                        food: { $first: "$food" },
                        service: { $first: "$service" },
                        ambiance: { $first: "$ambiance" },
                        avg_rating: { $first: "$avg_rating" },
                        createdAt: { $first: "$createdAt" },

                    }
                },

            ]);

            return aggregate

        } catch (e) {
            throw (e);
        }
    },



    delete: async (id) => {
        try {
            let restaurant_ratings = await Restaurant_rating.findById(id);
            if (restaurant_ratings) {
                let restaurant_ratingDelete = await Restaurant_rating.remove({
                    _id: id
                }).exec();
                return restaurant_ratingDelete;
            } else {
                return null;
            }
        } catch (e) {
            throw (e);
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },

    updateById: async (data, id) => {
        try {
            let restaurant_rating = await Restaurant_rating.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return restaurant_rating;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (data) => {

        try {
            let restaurant_rating = await Restaurant_rating.create(data);
            if (!restaurant_rating) {
                return null;
            }
            return restaurant_rating;
        } catch (e) {
            throw e;
        }
    },

    getCategories: async (params) => {
        try {
            let restaurant_rating = await Restaurant_rating.find(params).exec();
            return restaurant_rating;
        } catch (e) {
            throw (e);
        }
    }
};



module.exports = restaurant_ratingRepository;