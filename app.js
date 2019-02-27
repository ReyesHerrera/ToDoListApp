var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//created additional variable; navbarRouter, updateTaskRouter,addTaskRouter and deleteTaskRouter
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var navbarRouter = require('./routes/navbar');
var updateTaskRouter = require('./routes/updateTask');
var addTaskRouter = require('./routes/addTask');
var deleteTaskRouter = require('./routes/deleteTask');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//added navbar, addTask, deleteTask, updateTask to view engine setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/navbar', navbarRouter);
app.use('/updateTask', updateTaskRouter);
app.use('/addTask', addTaskRouter);
app.use('/deleteTask', deleteTaskRouter);


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
