const mongoose = require('mongoose');
var moment = require('moment');


//Schema for user 
const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  isVerified: { 
	  type: Boolean, 
	  default: false },
  password: {
    type: String,
    required: true,
    trim: true
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  createddate: {
    type: String,
    default: moment(new Date()).format("MMM DD, YYYY") //day, 5pm 18
  }
});
const User =  module.exports= mongoose.model('User', UserSchema);
