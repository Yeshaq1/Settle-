const mongoose = require('mongoose');
const Color = require('color/models/color.model');
const perPage = config.PAGINATION_PERPAGE;

const colorRepository = {
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
            var aggregate = Color.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allColors = await Color.aggregatePaginate(aggregate, options);
            return allColors;
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

            var result = await Color.aggregate([
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

    getColorCount: async (params) => {
        try {

            let color = await Color.countDocuments(params);
            return color;
        }
        catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let colors = await Color.findById(id).exec();
            return colors;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let colors = await Color.findOne(params).exec();
            return colors;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let colors = await Color.find(params).exec();
            return colors;
        } catch (e) {
            throw (e);
        }
    },

    delete: async (id) => {
        try {
            let colors = await Color.findById(id);
            if (colors) {
                let colorDelete = await Color.remove({
                    _id: id
                }).exec();
                return colorDelete;
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
            let color = await Color.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return color;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (data) => {

        try {
            let color = await Color.create(data);
            if (!color) {
                return null;
            }
            return color;
        } catch (e) {
            throw e;
        }
    },

    getCategories: async (params) => {
        try {
            let color = await Color.find(params).exec();
            return color;
        } catch (e) {
            throw (e);
        }
    }
};



module.exports = colorRepository;