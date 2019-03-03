var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator/check');

/* GET task page.*/
router.get('/', function(req, res, next) {
  res.render('tasks', { title: 'TaskTaskTask' });
});

router.post('/',
  [
    body('taskName')
      .isLength({ min: 2 })
      .withMessage('Please enter a task.')
  ],
  function(req, res) {
      var errors = validationResult(req);

      if (errors.isEmpty()) {
        res.send('Task entered! \nYou\'re on a roll.');
      } else {
        res.render('tasks', {
          title: 'Add a Task',
          errors: errors.array(),
          data: req.body,
        });
      }
    }
      console.log(req.body);
      //res.render('tasks', { title: 'Task Yourself' });
);

module.exports = router;
