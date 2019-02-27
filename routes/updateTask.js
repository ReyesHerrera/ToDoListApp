var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('updateTask', { title: 'ToDoListApp Updating a Task' });
});

module.exports = router;
