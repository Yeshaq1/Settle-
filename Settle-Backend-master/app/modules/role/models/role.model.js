const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
// define the schema for our user model
const roleSchema = mongoose.Schema({
    roleDisplayName: String,
    role: String,
    rolegroup: { type: String, default: 'backend', enum: ['frontend', 'backend'] },
    desc: {type: String, default: '' },
});

roleSchema.set('toJSON', { virtuals: true });
roleSchema.virtual('rolepermission', {
    ref: 'RolePermission', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'role', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false
});

roleSchema.virtual('user_data', {
    ref: 'User', // the model to use
    localField: '_id', // find children where 'localField' 
    foreignField: 'role', // is equal to foreignField
    justOne: false
});
roleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Role', roleSchema);