var express = require('express');
var mongoose = require('mongoose');
var { body, validationResult } = require('express-validator/check');

var router = express.Router();
var Task = mongoose.model('tasks');

/* GET task page.*/
router.get('/', function(req, res, next) {
  res.render('tasks', { title: 'TaskTaskTask View' });
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
        //find in db
        User.findById(req.user.id, (err, user) => {
          if (err) throw new Error(err);
          //create task object with data from task req
          const newTask = {
            taskName: req.body.taskName,
            taskDateDue: req.body.taskDateDue,
            taskContent: req.body.taskContent,
            taskAuthor: req.user._id //user is author
          };
          //create new task in db
          Task.create(newTask, (err, post) => {
            if (err) {
              res.redirect('/');
              throw new Error(err);
            }
            //insert newTask in posts field for user found in db call
            user.tasks.push(newTask);
            //save user with new data (task added)
            user.save((err) => {
              return res.redirect('/tasks/${task.id}');
            });
          })
        });

        // var task = new Task(req.body);
        newTask.save()
          .then(() => { res.send('Task entered! \nYou\'re on a roll.'); })
          .catch(() => { res.send('Sorry! Something went wrong.'); });
      } else {
        res.render('tasks', {
          title: 'Add a Task?',
          errors: errors.array(),
          data: req.body,
        });
      }
      console.log(req.body);
      //res.render('tasks', { title: 'Task Yourself' });
});

module.exports = router;
