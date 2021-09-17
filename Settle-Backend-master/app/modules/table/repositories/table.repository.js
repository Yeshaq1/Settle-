const mongoose = require('mongoose');
const Table = require('table/models/table.model');
const perPage = config.PAGINATION_PERPAGE;

const tableRepository = {
    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });
            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                //and_clauses.push({"status": /req.body.query.generalSearch/i});
                and_clauses.push({
                    $or: [
                        { 'name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'restaurant.restaurant_name': { $regex: req.body.query.generalSearch, $options: 'i' } }
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
            var aggregate = Table.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "restaurant_id",
                        foreignField: "_id",
                        as: "restaurant"
                    }
                },
                { $unwind: "$restaurant" },
                { $match: conditions },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allTables = await Table.aggregatePaginate(aggregate, options);
            return allTables;
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

            var result = await Table.aggregate([
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

    getTableCount: async (params) => {
        try {

            let table = await Table.countDocuments(params);
            return table;
        }
        catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let tables = await Table.findById(id).exec();
            return tables;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let tables = await Table.findOne(params).exec();
            return tables;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let tables = await Table.find(params).exec();
            return tables;
        } catch (e) {
            throw (e);
        }
    },



    delete: async (id) => {
        try {
            let tables = await Table.findById(id);
            if (tables) {
                let tableDelete = await Table.remove({
                    _id: id
                }).exec();
                return tableDelete;
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
            let table = await Table.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return table;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (data) => {

        try {
            let table = await Table.create(data);
            if (!table) {
                return null;
            }
            return table;
        } catch (e) {
            throw e;
        }
    },

    getCategories: async (params) => {
        try {
            let table = await Table.find(params).exec();
            return table;
        } catch (e) {
            throw (e);
        }
    }
};



module.exports = tableRepository;