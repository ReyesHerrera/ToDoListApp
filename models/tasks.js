let mongoose = require('mongoose');

//create database structure for tasks table
let tasksSchema = mongoose.Schema({
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
});

let Tasks = module.exports = mongoose.model('Tasks', tasksSchema);