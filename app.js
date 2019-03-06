//might change to constant these variables
var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
//var passport = require('passport');

//using mongodb for data base
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/ToDoListApp');
let db = mongoose.connection;

//checking connection to server
db.once('open', function(){
    console.log('We are connected to MongoDB');
});
//checking for DB errors
db.on('error', function(err){
    console.log(err);
});


//might have to consolidate into one file in routes
//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var navbarRouter = require('./routes/navbar');

//inititalizing
var app = express();

//bringing models for Tasks
let Tasks = require('./models/tasks');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//middle ware for bodyparser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//view engine setup
//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/navbar', navbarRouter);
//HOME ROUTE
app.get('/', function(req, res) {
  Tasks.find({}, function(err, tasks){
    if(err){
      console.log(err);
    }else {
      res.render('index', {
        title: 'ToDoList App',
        tasks: tasks
    });
  }
  });
});

//GET one task
app.get('/task/:id', function(req, res){
  Task.findById(req.params.id, function(err, task){
    res.render('task',{
      task:task
    });
  });
});
//router for add
app.get('/tasks/add', function(req, res, next) {
  res.render('addTask', {
    title: 'ToDoList App  Add'
  });
});


//post route for add submit form
app.post('/tasks/add', function(req, res){
  req.checkBody('taskName', 'task name is required').notEmpty();
  req.checkBody('priority', 'priority  is required').notEmpty();
  req.checkBody('content', 'content is required').notEmpty();
  req.checkBody('duedate', 'due date is required').notEmpty();

  //Error for validations
  let errors = req.validationErrors();
  if (errors){
    res.render('addTask',{
      title: 'Add Task',
      errors:errors
    });
  }else{
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
};

//Edit form for task
app.get('/task/edit/:id', function(req, res){
  Task.findById(req.params.id, function(err, task){
    res.render('updateTask',{
      title:'updateTask',
      task:task
    });
  });
});

//POST route for update submit form
app.post('/tasks/edit/:id', function(req, res){
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
  app.delete('/tasks/:id', function(rep, res){
    let query = {_id:req.params.id}

    Tasks.remove(query, function(err){
      if(err){
        console.log(err);
      }
      res.send('successfull deletion');
    });
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
