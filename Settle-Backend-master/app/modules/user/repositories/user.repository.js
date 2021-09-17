const mongoose = require('mongoose');
const User = require('user/models/user.model');
const perPage = config.PAGINATION_PERPAGE;
var moment = require('moment');

const userRepository = {
    fineOneWithRole: async (params) => {
        try {
            let user = await User.findOne({
                email: params.email, isDeleted: false, isActive: true
            }).populate('role').exec();
            if (!user) {
                throw {
                    "status": 500,
                    data: null,
                    "message": 'Authentication failed. User not found.'
                }
            }

            if (!user.validPassword(params.password, user.password)) {
                throw {
                    "status": 500,
                    data: null,
                    "message": 'Authentication failed. Wrong password.'
                }
            } else {
                throw {
                    "status": 200,
                    data: user,
                    "message": ""
                }
            }
        } catch (e) {
            return e;
        }

    },

    getAllUsers: async (req) => {
        try {
            var conditions = {};
            var and_clauses = [];

            and_clauses.push({ "isDeleted": false });
            and_clauses.push({ "user_role.role": req.body.role });

            if (_.isObject(req.body.query) && _.has(req.body.query, 'generalSearch')) {
                and_clauses.push({
                    $or: [
                        { 'first_name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'last_name': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'email': { $regex: req.body.query.generalSearch, $options: 'i' } },
                        { 'phone': { $regex: req.body.query.generalSearch, $options: 'i' } }
                    ]
                });
            }
            if (_.isObject(req.body.query) && _.has(req.body.query, 'Status')) {
                (req.body.query.Status == 'Active') ? and_clauses.push({ "isActive": true }) : and_clauses.push({ "isActive": false });
                //and_clauses.push({"isActive": req.body.query.Status});
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
            var aggregate = User.aggregate([
                {
                    $lookup: {
                        "from": "roles",
                        "localField": "role",
                        "foreignField": "_id",
                        "as": "user_role"
                    }
                },
                { $match: conditions },
                {
                    $group: {
                        _id: '$_id',
                        'first_name': { $first: '$first_name' },
                        'last_name': { $first: '$last_name' },
                        'email': { $first: '$email' },
                        'phone': { $first: '$phone' },
                        'isActive': { $first: '$isActive' },
                        'role': { $first: '$user_role' },
                        'register_type': { $first: '$register_type' },
                        'profile_image': { $first: '$profile_image' }
                    }
                },
                sortOperator
            ]);

            var options = { page: req.body.pagination.page, limit: req.body.pagination.perpage };
            let allUsers = await User.aggregatePaginate(aggregate, options);

            return allUsers;
        }
        catch (e) {
            throw (e);
        }
    },

    getById: async (id) => {
        try {
            let user = await User.findById(id).lean().exec();
            if (!user) {
                return null;
            }
            return user;

        } catch (e) {
            return e;
        }
    },

    getByField: async (params) => {
        try {
            let user = await User.findOne(params).exec();
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            return e;
        }
    },

    getByFieldWithRole: async (params) => {

        try {
            let user = await User.findOne(params).populate('role').exec();
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
            let user = await User.find(params).sort({ 'full_name': 1 }).exec();
            if (!user) {
                return null;
            }
            return user;

        } catch (e) {
            return e;
        }
    },

    getLimitUserByField: async (params) => {

        try {
            let user = await User.find(params).populate('role').limit(5).sort({
                _id: -1
            }).exec();
            if (!user) {
                return null;
            }
            return user;

        } catch (e) {
            return e;
        }
    },

    delete: async (id) => {
        try {
            let user = await User.findById(id);
            if (user) {
                let userDelete = await User.remove({
                    _id: id
                }).exec();
                if (!userDelete) {
                    return null;
                }
                return userDelete;
            }
        } catch (e) {
            return e;
        }
    },

    deleteByField: async (field, fieldValue) => {
        //todo: Implement delete by field
    },


    updateById: async (data, id) => {
        try {
            let user = await User.findByIdAndUpdate(id, data, {
                new: true
            });

            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            return e;
        }
    },

    updateByField: async (field, fieldValue, data) => {
        try {
            let user = await User.findByIdAndUpdate(fieldValue, field, {
                new: true
            });
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            return e;
        }
    },

    save: async (data) => {
        try {
            let user = await User.create(data);

            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            return e;
        }
    },

    forgotPassword: async (params) => {

        try {
            let user = await User.findOne({ email: params.email }).exec();
            if (!user) {
                throw { "status": 500, data: null, "message": 'Authentication failed. User not found.' }
            }
            else if (user) {
                let random_pass = Math.random().toString(36).substr(2, 9);
                let readable_pass = random_pass;
                random_pass = user.generateHash(random_pass);
                let user_details = await User.findByIdAndUpdate(user._id, { password: random_pass }).exec();
                if (!user_details) {
                    throw { "status": 500, data: null, "message": 'User not found.' }
                }
                else {
                    throw { "status": 200, data: readable_pass, "message": "Mail is sending to your mail id with new password" }
                }
                //return readable_pass;	
            }
        }
        catch (e) {
            return e;
        }
    },

    getUser: async (id) => {
        try {
            let user = await User.findOne({
                id
            }).exec();
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            return e;
        }
    },

    getUserByField: async (data) => {
        try {
            let user = await User.findOne(data).populate('role').exec();
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            return e;
        }
    },
    getUsersByField: async (data) => {
        try {
            let user = await User.find(data).populate('role').exec();
            if (!user) {
                return null;
            }
            return user;
        } catch (e) {
            return e;
        }
    },

    getUserCountByParam: async (params) => {
        try {

            let user = await User.countDocuments(params);
            return user;
        } catch (e) {
            throw (e);
        }
    },


    getUsersCount: async (req) => {
        try {
            var conditions = {
                'isActive': true
            };
            var and_clauses = [];

            and_clauses.push({
                "isDeleted": false
            });
            and_clauses.push({
                "user_role.role": {
                    "$ne": "admin"
                }
            });

            conditions['$and'] = and_clauses;
            let users = await User.aggregate([{
                "$lookup": {
                    "from": "roles",
                    "localField": "role",
                    "foreignField": "_id",
                    "as": "user_role"
                },
            },
            {
                $unwind: "$user_role"
            },
            {
                $match: conditions
            },
            {
                $group: {
                    _id: "$user_role._id",
                    name: {
                        $first: "$user_role.role"
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                "$sort": {
                    _id: 1
                }
            },
            ]).exec();
            return users;
        } catch (e) {
            throw (e);
        }
    },

};

module.exports = userRepository;