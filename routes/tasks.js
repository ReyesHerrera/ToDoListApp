const express = require('express');
const router = express.Router();

//task  Model
let Tasks = require('../models/tasks');
// User Model
let User = require('../models/users');

//add route
//router for add
router.get('/add', function(req, res) {
  res.render('addTask', {
    title: 'Add Task'
  });
});


//post route for add submit form
router.post('/add', function(req, res){
  req.checkBody('taskName', 'task name is required').notEmpty();
  req.checkBody('priority', 'priority  is required').notEmpty();
  req.checkBody('content', 'content is required').notEmpty();
  req.checkBody('duedate', 'due date is required').notEmpty();
  req.checkBody('taskDateEntered', 'this is automatic').notEmpty();

  //Error for validations
  let errors = req.validationErrors();
  if (errors){
    res.render('addTask',{
      title: 'Add Task',
      errors:errors
    });
  } else {
	let tasks = new Tasks();
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
  }
});

//Edit form for task
router.get('/edit/:id', function(req, res){
  Tasks.findById(req.params.id, function(err, task){
    res.render('updateTask',{
      title:'updateTask',
      task:task
    });
  });
});

//POST route for update submit form
router.post('/edit/:id', function(req, res){
  let tasks = {};
  tasks.taskName = req.body.taskName;
  tasks.priority = req.body.priority;
  tasks.content = req.body.content;
  tasks.duedate = req.body.duedate;

  let query = {_id:req.params.id}

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

//delete task
 router.delete('/:id', function(rep, res){
    let query = {_id:req.params.id}

    Tasks.remove(query, function(err){
      if(err){
        console.log(err);
      }
      res.send('successfull deletion');
    });
 });

module.exports = router;
