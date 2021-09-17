const mongoose = require('mongoose');
const UserWebApp = require('user/models/user.model');
const perPage = config.PAGINATION_PERPAGE;

const userWebAppRepository = {
    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });
            and_clauses.push({ "role": mongoose.Types.ObjectId(req.body.role) });
            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                //and_clauses.push({"status": /req.body.query.generalSearch/i});
                and_clauses.push({
                    $or: [
                        { 'email': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'phone': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'first_name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'last_name': { $regex: req.body.query.generalSearch, $options: 'i' } }
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                if (req.body.query.Status == "Active") {
                    and_clauses.push({ "isActive": true });
                }

                if (req.body.query.Status == "Inactive") {
                    and_clauses.push({ "isActive": false });
                }
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
            var aggregate = UserWebApp.aggregate([
                { $match: conditions },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allUserWebApps = await UserWebApp.aggregatePaginate(aggregate, options);
            return allUserWebApps;
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

            var result = await UserWebApp.aggregate([
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

    getUserWebAppCount: async (params) => {
        try {

            let userWebApp = await UserWebApp.countDocuments(params);
            return userWebApp;
        }
        catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let userWebApps = await UserWebApp.findById(id).exec();
            return userWebApps;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let userWebApps = await UserWebApp.findOne(params).exec();
            return userWebApps;
        } catch (e) {
            throw (e);
        }
    },

    getByFieldWithRole: async (params) => {

        try {
            let user = await UserWebApp.findOne(params).populate('role').exec();
            if (!user) {
                return null;
            }
            return user;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        try {
            let userWebApps = await UserWebApp.find(params).exec();
            return userWebApps;
        } catch (e) {
            throw (e);
        }
    },

    delete: async (id) => {
        try {
            let userWebApps = await UserWebApp.findById(id);
            if (userWebApps) {
                let userWebAppDelete = await UserWebApp.remove({
                    _id: id
                }).exec();
                return userWebAppDelete;
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
            let userWebApp = await UserWebApp.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return userWebApp;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    save: async (data) => {

        try {
            let userWebApp = await UserWebApp.create(data);
            if (!userWebApp) {
                return null;
            }
            return userWebApp;
        } catch (e) {
            throw e;
        }
    },

    getCategories: async (params) => {
        try {
            let userWebApp = await UserWebApp.find(params).exec();
            return userWebApp;
        } catch (e) {
            throw (e);
        }
    }
};



module.exports = userWebAppRepository;