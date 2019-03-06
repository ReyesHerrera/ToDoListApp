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
