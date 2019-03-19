var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
const config = require('./config/database');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// using mongodb for data base
 mongoose.connect(config.database, {useNewUrlParser: 'true'});
 let db = mongoose.connection;
 // checking connection to server
 db.once('open', function(){
     console.log('We are connected to MongoDB');
 });
 //checking for DB errors
 db.on('error', function(err){
     console.log(err);
 });

 // inititalizing
 var app = express();

// ROUTES
let indexRouter = require('./routes/index');
let tasksRouter = require('./routes/tasks');
let usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);


// models
let Tasks = require('./models/tasks');
let Users = require('./models/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add middleware libraries
app.use(cors());
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

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});



//HOME ROUTE
app.get('/', function(req, res) {
  Tasks.find({}, function(err, tasks){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title: 'Tasks',
        tasks: tasks
	  });
	}
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
