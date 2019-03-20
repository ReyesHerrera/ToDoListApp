const mongoose = require('mongoose');
var moment = require('moment');
var Tasks = require('./tasks');
var Token = require('./token');

//Schema for user
const userSchema = mongoose.Schema({
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
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  isVerified: {
	  type: Boolean,
	  default: false
  },
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

userSchema
  .virtual('url')
  .get(function() {
    return '/users/' + this._id;
});

const User =  module.exports = mongoose.model('User', userSchema);
