const mongoose = require('mongoose');
var moment = require('moment');


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

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email:this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

const User =  module.exports = mongoose.model('User', userSchema);
