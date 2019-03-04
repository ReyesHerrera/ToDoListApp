const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var moment = require('moment');
var bcrypt = require('bcrypt');


const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
  createdDate: {
    type: String,
    default: moment(new Date()).format("MMM DD, YYYY") //"Day, 5PM 18"
  },
  tasks: {
    type: ObjectId,
    ref: 'Task'
  }
});

UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) throw err;
    user.password = hash;
    console.log("Password hashed and user saved.");
    next();
  });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
