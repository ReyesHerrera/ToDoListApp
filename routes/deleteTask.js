var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('detele Task', { title: 'ToDoListApp Deleting a Task' });
});

module.exports = router;
