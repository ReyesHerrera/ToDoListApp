var express = require('express');
var router = express.Router();

/* GET task page. */
router.get('/', function(req, res, next) {
  res.render('tasks', { title: 'ToDoListApp' });
});

module.exports = router;
