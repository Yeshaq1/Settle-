const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const ColorSchema = new Schema({
  name: { type: String, default: '' },
  color_code: { type: String, default: '' },
  status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
}, { timestamps: true }, { versionKey: false });

// For pagination
ColorSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Color', ColorSchema);