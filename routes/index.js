var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ToDoListApp' });
});

router.get('/', (req, res) => {
    res.render('tasks', { title: 'Task Yourself' });
});

module.exports = router;
