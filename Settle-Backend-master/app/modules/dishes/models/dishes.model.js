const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const DishesSchema = new Schema({
  name: { type: String, default: '' },
  price: { type: Number, default: 0.00 },
  restaurant_id: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
}, { timestamps: true }, { versionKey: false });

// For pagination
DishesSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Dishes', DishesSchema);