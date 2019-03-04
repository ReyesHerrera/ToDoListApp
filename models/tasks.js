const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var moment = require('moment');


const TaskSchema = new Schema({
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
    default: moment(new Date()).format("MMM DD, YYYY") //"Sun, 3PM"
  },
  taskDateDue: {
    type: Date
  },
  taskContent: {
    type: String,
    trim: true,
    default: "No description provided."
  }
});

var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
