const mongoose = require('mongoose');
const Dishes_rating = require('dishes_rating/models/dishes_rating.model');
const perPage = config.PAGINATION_PERPAGE;

const dishes_ratingRepository = {
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
            var aggregate = Dishes_rating.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allDishes_ratings = await Dishes_rating.aggregatePaginate(aggregate, options);
            return allDishes_ratings;
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

            var result = await Dishes_rating.aggregate([
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

    getDishes_ratingCount: async (params) => {
        try {

            let dishes_rating = await Dishes_rating.countDocuments(params);
            return dishes_rating;
        }
        catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let dishes_ratings = await Dishes_rating.findById(id).exec();
            return dishes_ratings;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let dishes_ratings = await Dishes_rating.findOne(params).exec();
            return dishes_ratings;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let dishes_ratings = await Dishes_rating.find(params).exec();
            return dishes_ratings;
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
            and_clauses.push({ "dishes.restaurant_id": mongoose.Types.ObjectId(req.user._id) });

            conditions['$and'] = and_clauses;

            var aggregate = Dishes_rating.aggregate([
                {
                    $lookup: {
                        from: "dishes",
                        localField: "dish_id",
                        foreignField: "_id",
                        as: "dishes"
                    }
                },
                { $unwind: "$dishes" },
                { $match: conditions },
                {
                    $group:
                    {
                        _id: "$dish_id",
                        dish_name: { $first: "$dishes.name" },
                        avgRating: { $avg: "$rating" }
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
            and_clauses.push({ "dishes.restaurant_id": mongoose.Types.ObjectId(req.user._id) });

            conditions['$and'] = and_clauses;

            var aggregate = Dishes_rating.aggregate([
                {
                    $lookup: {
                        from: "dishes",
                        localField: "dish_id",
                        foreignField: "_id",
                        as: "dishes"
                    }
                },
                { $unwind: "$dishes" },
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
            ]);

            return aggregate

        } catch (e) {
            throw (e);
        }
    },

    delete: async (id) => {
        try {
            let dishes_ratings = await Dishes_rating.findById(id);
            if (dishes_ratings) {
                let dishes_ratingDelete = await Dishes_rating.remove({
                    _id: id
                }).exec();
                return dishes_ratingDelete;
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
            let dishes_rating = await Dishes_rating.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return dishes_rating;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (data) => {

        try {
            let dishes_rating = await Dishes_rating.create(data);
            if (!dishes_rating) {
                return null;
            }
            return dishes_rating;
        } catch (e) {
            throw e;
        }
    },

    getCategories: async (params) => {
        try {
            let dishes_rating = await Dishes_rating.find(params).exec();
            return dishes_rating;
        } catch (e) {
            throw (e);
        }
    }
};



module.exports = dishes_ratingRepository;