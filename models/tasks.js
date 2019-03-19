let mongoose = require('mongoose');
var moment = require('moment');

var now = moment(new Date()).format("MMM DD, YYYY");


//create database structure for tasks table
let tasksSchema = mongoose.Schema({
    taskAuthor:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    taskName:{
        type: String,
        require: true
    },
    priority:{
        type: String,
        require: true
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

let Tasks = module.exports = mongoose.model('Tasks', tasksSchema);
