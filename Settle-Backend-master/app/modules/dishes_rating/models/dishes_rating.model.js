const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const Dishes_ratingSchema = new Schema({
  dish_id: { type: Schema.Types.ObjectId, ref: 'Dishes', default: null },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  rating: { type: Number, default: 0 },
  comment: { type: String, default: '' },
  status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
}, { timestamps: true }, { versionKey: false });

// For pagination
Dishes_ratingSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Dishes_rating', Dishes_ratingSchema);