let mongoose = require('mongoose');
var moment = require('moment');
var User = require('./users');

var now = moment(new Date()).format("MMM DD, YYYY");


//create database structure for tasks table
let tasksSchema = mongoose.Schema({
    _userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    taskName:{
        type: String,
        require: true
    },
    priority:{
        type: Boolean,
        default: false
    },
    content:{
        type: String,
        require: true
    },
    duedate:{
        type: String,
        require: true
    },
    taskDateEntered:{
        type: String,
        default: now //"Sun, 3PM"
    }
});

tasksSchema
  .virtual('url')
  .get(function () {
    return '/tasks/view/' + this._id;
});

let Tasks = module.exports = mongoose.model('Tasks', tasksSchema);
