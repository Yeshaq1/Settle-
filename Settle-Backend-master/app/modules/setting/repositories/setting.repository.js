const Setting = require('setting/models/setting.model');
const perPage = config.PAGINATION_PERPAGE;


const SettingRepository = {
    getAll: async (req) => {

        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({
                "isDeleted": false
            });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                //and_clauses.push({"status": /req.body.query.generalSearch/i});
                and_clauses.push({
                    $or: [{
                        'setting_value': {
                            $regex: req.body.query.generalSearch,
                            $options: 'i'
                        }
                    }, ]
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

            var aggregate = Setting.aggregate([{
                    $match: conditions
                },
                sortOperator
            ]);

            var options = {
                page: req.body.pagination.page,
                limit: req.body.pagination.perpage
            };
            let allSetting = await Setting.aggregatePaginate(aggregate, options);
            return allSetting;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let settings = await Setting.findById(id).exec();
            return settings;
        } catch (e) {
            throw (e);
        }
    },

    getByField: async (params) => {
        try {
            let settings = await Setting.findOne(params).exec();
            return settings;
        } catch (e) {
            throw (e);
        }
    },

    getAllByField: async (params) => {
        try {
            let settings = await Setting.find(params).exec();
            return settings;
        } catch (e) {
            throw (e);
        }
    },

    delete: async (id) => {
        try {
            let settings = await Setting.findById(id);
            if (settings) {
                let settingDelete = await Setting.remove({
                    _id: id
                }).exec();
                return settingDelete;
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
            let setting = await Setting.findByIdAndUpdate(id, data, {
                new: true,
                upsert: true
            }).exec();
            return setting;
        } catch (e) {
            throw (e);
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },

    getAllSetting: async () => {
        try {
            return await Setting.find().exec();
        } catch (error) {
            return error;
        }
    },

    save: async (data) => {
        try {
            let setting = await Setting.create(data);
            if (!setting) {
                return null;
            }
            return setting;
        } catch (e) {
            throw e;
        }
    },

};

module.exports = SettingRepository;