var express = require('express');
var mongoose = require('mongoose');
var { body, validationResult } = require('express-validator/check');

var router = express.Router();
var Task = mongoose.model('Task', './models/tasks');

/* GET taskview page.*/
router.get('/tasksView', function(req, res) {
  Task.find()
    .then((tasks) => {
      res.render('tasksView', { title: 'TaskTaskTask View', tasks });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});


module.exports = router;
