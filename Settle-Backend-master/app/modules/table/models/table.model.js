const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const TableSchema = new Schema({
  name: { type: String, default: '' },
  seat: [{ type: String, default: '' }],
  restaurant_id: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
}, { timestamps: true }, { versionKey: false });

// For pagination
TableSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Table', TableSchema);