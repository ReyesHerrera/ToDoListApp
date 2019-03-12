const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var moment = require('moment');
var now = moment(new Date()).format("MMM DD, YYYY");


const TaskSchema = new Mongoose.Schema({
  taskAuthor: {
    type: ObjectId,
    ref: "User"
  },
  taskName: {
    type: String,
    trim: true,
    required: true
  },
  taskDateEntered: {
    type: String,
    default: now //"Sun, 3PM"
  },
  taskDateDue: {
    type: String,
    default: moment().add(7, 'days').format("MMM DD, YYYY") // add 7 days from now
  },
  taskContent: {
    type: String,
    trim: true,
    default: "No description provided."
  },
  priority: {
    type: String,
    require: true
  }
});

var Task = mongoose.model('Task', TaskSchema, 'task');
module.exports = Task;
