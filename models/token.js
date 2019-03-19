let mongoose = require('mongoose');
var moment = require('moment');

var now = moment(new Date()).format("MMM DD, YYYY");


const tokenSchema = new mongoose.Schema({
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    token: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true,
      default: now,
      expires: 43200
    }
});

const token =  module.exports= mongoose.model('Token', tokenSchema);
