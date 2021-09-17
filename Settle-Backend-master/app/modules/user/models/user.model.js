var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var mongooseAggregatePaginate = require('mongoose-aggregate-paginate');
const deleted = [true, false];
const devicetype = ["android", "ios"];
const emailnotification = [true, false];
const notification = [true, false];
const registertype = ['normal'];

var UserSchema = new Schema({
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  email: { type: String, default: '' },
  user_name: { type: String, default: '' },
  phone: { type: String, default: '' },
  zip_code: { type: String, default: '' },
  password: { type: String, default: '' },
  profile_image: { type: String, default: '' },
  verificationCode: { type: String, default: '' },
  //Restaurant
  restaurant_name: { type: String, default: '' },
  restaurant_photos: [{ type: String, default: '' }],
  restaurant_menu_pdf: { type: String, default: '' },
  //Restaurant end
  register_type: { type: String, default: 'normal', enum: registertype },
  isVerified: { type: Boolean, default: false, enum: deleted },
  isDeleted: { type: Boolean, default: false, enum: deleted },
  mobileVerificationCode: { type: String, default: '' },
  isMobileVerified: { type: Boolean, default: false, enum: [true, false] },
  loggedInToken: { type: String, default: '' },
  isLoggedIn: { type: Boolean, default: false, enum: [true, false] },
  deviceToken: { type: String, default: '' },
  deviceType: { type: String, default: 'android', enum: devicetype },
  invalidLoginAttempts: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true, enum: [true, false] },
}, { timestamps: true, versionKey: false });

// generating a hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password, checkPassword) {
  return bcrypt.compareSync(password, checkPassword);
  //bcrypt.compare(jsonData.password, result[0].pass
};

// For pagination
UserSchema.plugin(mongooseAggregatePaginate);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);