const mongoose = require('mongoose');
var moment = require('moment');
const Transaction = require('transaction/models/transaction.model');
const perPage = config.PAGINATION_PERPAGE;

const TransRepository = {

    getAll: async (req) => {

        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                "status": "Active",
                "isDeleted": false,
            });



            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {

                and_clauses.push({
                    $or: [
                        { 'trans_date': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'amount': parseFloat(req.body.query.generalSearch) },
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                and_clauses.push({
                    "status": req.body.query.Status
                });
            }
            conditions['$and'] = and_clauses;

            var sortOperator = {
                "$sort": {}
            };
            if (_.has(req.body, 'sort')) {
                var sortField = req.body.sort.field;
                if (req.body.sort.sort == 'desc') {
                    var sortOrder = -1;
                } else if (req.body.sort.sort == 'asc') {
                    var sortOrder = 1;
                }

                sortOperator["$sort"][sortField] = sortOrder;
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }

            var aggregate = Transaction.aggregate([
                {
                    $lookup: {
                        "from": "users",
                        "localField": "user_id",
                        "foreignField": "_id",
                        "as": "users"
                    }
                },
                {
                    "$unwind": "$users"
                },
                {
                    $match: conditions
                },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allTransaction = await Transaction.aggregatePaginate(aggregate, options);
            return allTransaction;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let transaction_info = await Transaction.findById(id).lean().exec();
            if (!transaction_info) {
                return null;
            }
            return transaction_info;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        try {
            let transaction_info = await Transaction.findOne(params).exec();
            if (!transaction_info) {
                return null;
            }
            return transaction_info;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        try {
            let transaction_info = await Transaction.find(params).sort({ 'createdAt': -1 }).exec();
            if (!transaction_info) {
                return null;
            }
            return transaction_info;

        } catch (e) {
            return e;
        }
    },

    getAllByFieldAPI: async (req) => {
        try {

            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                "status": "Active",
                "isDeleted": false,
            });


            if (req.body.trans_date && req.body.trans_date != "") {
                var d = moment(req.body.trans_date).format("YYYY-MM-DD")
                var d1 = moment(req.body.trans_date).add(1, "days").format("YYYY-MM-DD")
                // console.log(d1)
                and_clauses.push({ "trans_date": { $gte: new Date(d + "T00:00:00.000Z") } });
                and_clauses.push({ "trans_date": { $lt: new Date(d1 + "T00:00:00.000Z") } });

            }
            if (req.body.table_name && req.body.table_name != "") {

                and_clauses.push({
                    $or: [
                        { 'table.name': { $regex: req.body.table_name, $options: 'i' } },
                    ]
                });
            }


            conditions['$and'] = and_clauses;

            var sortOperator = {
                "$sort": {}
            };
            sortOperator["$sort"]['_id'] = -1;

            return await Transaction.aggregate([
                {
                    $lookup: {
                        "from": "users",
                        "localField": "user_id",
                        "foreignField": "_id",
                        "as": "user"
                    }
                },
                {
                    "$unwind": "$user"
                },
                {
                    $lookup: {
                        "from": "users",
                        "localField": "restaurant_id",
                        "foreignField": "_id",
                        "as": "restaurant"
                    }
                },
                {
                    "$unwind": "$restaurant"
                },
                {
                    $lookup: {
                        "from": "tables",
                        "localField": "table_id",
                        "foreignField": "_id",
                        "as": "table"
                    }
                },
                {
                    "$unwind": "$table"
                },
                {
                    $match: conditions
                },
                sortOperator
            ]).exec()

        } catch (e) {
            return e;
        }
    },

    save: async (data) => {
        try {
            let save = await Transaction.create(data);
            if (!save) {
                return null;
            }
            return save;
        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let transaction_info = await Transaction.findById(id);
            if (transaction_info) {
                let transaction_infoDelete = await Transaction.deleteOne({ _id: id }).exec();
                if (!transaction_infoDelete) {
                    return null;
                }
                return transaction_infoDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    updateById: async (id, data) => {
        try {
            let transaction_info = await Transaction.findByIdAndUpdate(id, data, { new: true });
            if (!transaction_info) {
                return null;
            }
            return transaction_info;
        } catch (e) {
            return e;
        }
    }
};

module.exports = TransRepository;