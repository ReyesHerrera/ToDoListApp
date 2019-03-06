var express = require('express');
var mongoose = require('mongoose');
var {body, validationResult } = require('express-validator/check');

var router = express.Router();
var Task = mongoose.model('Task', './models/tasks');

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

///DOESNOTWORK?!!!
var express = require('express');
var router = express.Router();

//bringing models for Tasks
var Tasks = require('../models/tasks');

///GET one task
router.get('/:id', function(req, res){
  Task.findById(req.params.id, function(err, task){
    res.render('task',{
      task:task
    });
  });
});
//router for add
router.get('/add', function(req, res, next) {
  res.render('addTask', {
    title: 'ToDoList App  Add'
  });
});

//post route for add submit form
router.post('/add', function(req, res){
  req.checkBody('taskName', 'task name is required').notEmpty();
  req.checkBody('priority', 'priority  is required').notEmpty();
  req.checkBody('content', 'content is required').notEmpty();
  req.checkBody('duedate', 'due date is required').notEmpty();

  //Error for validations
  var errors = req.validationErrors();
  if (errors){
    res.render('addTask',{
      title: 'Add Task',
      errors:errors
    });
  }else{
    var tasks = new Tasks();
    tasks.taskName = req.body.taskName;
    tasks.priority = req.body.priority;
    tasks.content = req.body.content;
    tasks.duedate = req.body.duedate;
    //console.log('Its working');
    //return;

    tasks.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Task was added');
        res.redirect('/');
      }
    });
  };

  //Edit form for task
  router.get('/edit/:id', function(req, res){
    Task.findById(req.params.id, function(err, task){
      res.render('updateTask',{
        title:'updateTask',
        task:task
      });
    });
  });
  //POST route for update submit form
  router.post('/edit/:id', function(req, res){
    var tasks = {};
    tasks.taskName = req.body.taskName;
    tasks.priority = req.body.priority;
    tasks.content = req.body.content;
    tasks.duedate = req.body.duedate;

    var query = {_id:req.params.id}

    Tasks.update(query, tasks, function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Task was updated');
        res.redirect('/');
      }
    });
  });
  //deleting task
  router.delete('/:id', function(rep, res){
    var query = {_id:req.params.id}

    Tasks.remove(query, function(err){
      if(err){
        console.log(err);
      }
      res.send('successfull deletion');
    });
  });
});
module.exports = router;
