//import node libraries
//more notes
var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// req schemas from models dir
var tasksModel = require('./models/tasks');
var usersModel = require('./models/users');

//require modules from routes dir
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var tasksViewRouter = require('./routes/tasksView');

//create app
var app = express();

//DB Config
// var db = require('./config/keys').mongoURI

// Connect to MongoDB
// mongoose.connect(db,
//   { useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//add middleware libraries
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//middle ware for bodyparser
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


//route-handling code
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/tasksView', tasksViewRouter);


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
