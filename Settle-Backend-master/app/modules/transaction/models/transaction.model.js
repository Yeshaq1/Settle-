const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

const status = ['Active', 'Inactive'];


const TransactionSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  table_id: { type: mongoose.Schema.Types.ObjectId, ref: 'tables' },
  transactionId: { type: String, default: '' },
  amount: { type: Schema.Types.Double, default: 0.0 },
  tip_amount: { type: Schema.Types.Double, default: 0.0 },
  trans_date: { type: Date, default: Date.now },
  items_ordered: { type: String, default: '' },
  status: { type: String, default: 'Active', enum: status }
}, { timestamps: true, versionKey: false });

// For pagination
TransactionSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('Transaction', TransactionSchema);
