const mongoose = require('mongoose');
const Dishes = require('dishes/models/dishes.model');
const perPage = config.PAGINATION_PERPAGE;

const dishesRepository = {
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
            var aggregate = Dishes.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allDishess = await Dishes.aggregatePaginate(aggregate, options);
            return allDishess;
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

            var result = await Dishes.aggregate([
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

    getDishesCount: async (params) => {
        try {

            let dishes = await Dishes.countDocuments(params);
            return dishes;
        }
        catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let dishess = await Dishes.findById(id).exec();
            return dishess;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let dishess = await Dishes.findOne(params).exec();
            return dishess;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let dishess = await Dishes.find(params).exec();
            return dishess;
        } catch (e) {
            throw (e);
        }
    },

    delete: async (id) => {
        try {
            let dishess = await Dishes.findById(id);
            if (dishess) {
                let dishesDelete = await Dishes.remove({
                    _id: id
                }).exec();
                return dishesDelete;
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
            let dishes = await Dishes.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return dishes;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (data) => {

        try {
            let dishes = await Dishes.create(data);
            if (!dishes) {
                return null;
            }
            return dishes;
        } catch (e) {
            throw e;
        }
    },

    getCategories: async (params) => {
        try {
            let dishes = await Dishes.find(params).exec();
            return dishes;
        } catch (e) {
            throw (e);
        }
    }
};



module.exports = dishesRepository;