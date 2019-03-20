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

  //Error for validations
  let errors = req.validationErrors();
  if (errors){
    res.render('addTask',{
      title: 'Add Task',
      errors:errors
    });
  }
	let tasks = new Tasks();
  tasks._userId = User._id;
	tasks.taskName = req.body.taskName;
	// tasks.priority = req.body.priority;
	tasks.content = req.body.content;
	tasks.duedate = req.body.duedate;

  	tasks.save(function(err){
      if(err){
	    console.log(err);
        return;
      } else {
        req.flash('success', 'Task was added');
        res.redirect('/');
      }
    });
});

/* GET taskview page.*/
router.get('/view', function(req, res) {
  Task.find()
    .then((tasks) => {
      res.render('tasksView', { title: 'TaskTaskTask View', tasks });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
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
      res.send('successful deletion');
    });
 });

module.exports = router;
