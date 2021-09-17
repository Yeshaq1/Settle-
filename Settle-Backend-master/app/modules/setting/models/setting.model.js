const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ["Active", "Inactive"];

const SettingSchema = new Schema({
  setting_name: {
    type: String,
    default: ''
  },
  setting_slug: {
    type: String,
    default: ''
  },
  setting_value: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Active',
    enum: status
  },
  isDeleted: {
    type: Boolean,
    default: false,
    enum: [true, false]
  },
});

// For pagination
SettingSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Setting', SettingSchema);