const mongoose = require('mongoose');
const Cms = require('cms/models/cms.model');
const perPage = config.PAGINATION_PERPAGE;

const cmsRepository = {

    getAll: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'title': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'slug': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'content': { $regex: req.body.query.generalSearch, $options: 'i' } }
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
                } else if (req.body.sort.sort == 'asc') {
                    var sortOrder = 1;
                }

                sortOperator["$sort"][sortField] = sortOrder;
            } else {
                sortOperator["$sort"]['_id'] = -1;
            }

            var aggregate =  Cms.aggregate([
                { $match: conditions },
                sortOperator
            ]);
            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allCms = await Cms.aggregatePaginate(aggregate, options);
            return allCms;
        } catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let cms = await Cms.findById(id).lean().exec();
            if (!cms) {
                return null;
            }
            return cms;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        try {
            let cms = await Cms.findOne(params).exec();
            if (!cms) {
                return null;
            }
            return cms;

        } catch (e) {
            return e;
        }
    },

    getAllByField: async (params) => {
        try {
            let cms = await Cms.find(params).exec();
            if (!cms) {
                return null;
            }
            return cms;

        } catch (e) {
            return e;
        }
    },

    getCmsCount: async (params) => {
        try {
            let cmsCount = await Cms.countDocuments(params);
            if (!cmsCount) {
                return null;
            }
            return cmsCount;
        } catch (e) {
            return e;
        }

    },




    delete: async (id) => {
        try {
            let cms = await Cms.findById(id);
            if (cms) {
                let cmsDelete = await Cms.deleteOne({ _id: id }).exec();
                if (!cmsDelete) {
                    return null;
                }
                return cmsDelete;
            }
        } catch (e) {
            throw e;
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },


    updateById: async (data, id) => {
        try {
            let cms = await Cms.findByIdAndUpdate(id, data, { new: true });
            if (!cms) {
                return null;
            }
            return cms;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        //todo: update by field
    },






};

module.exports = cmsRepository;