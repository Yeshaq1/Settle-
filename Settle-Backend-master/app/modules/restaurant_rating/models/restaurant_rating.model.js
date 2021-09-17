const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const Restaurant_ratingSchema = new Schema({
  restaurant_id: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  food: { type: Number, default: 0 },
  service: { type: Number, default: 0 },
  ambiance: { type: Number, default: 0 },
  avg_rating: { type: Number, default: 0 },
  comment: { type: String, default: '' },
  status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
  isDeleted: { type: Boolean, default: false, enum: [true, false] },
}, { timestamps: true }, { versionKey: false });

// For pagination
Restaurant_ratingSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Restaurant_rating', Restaurant_ratingSchema);