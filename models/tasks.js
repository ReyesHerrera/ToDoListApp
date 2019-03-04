var mongoose = require('mongoose');

var tasksSchema = new mongoose.Schema({
  taskAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  taskName: {
    type: String,
    trim: true,
  },
  taskDateEntered: {
    type: Date
  },
  taskDateDue: {
    type: Date
  },
  taskContent: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Tasks', tasksSchema);
