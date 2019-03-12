//import node libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

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

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://Han:p%40ssw0rd@test-cluster-ohp2e.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//DB Config
// const MongoClient = require('mongodb').MongoClient;
//
// // replace the uri string with your connection string.
// const uri = "mongodb+srv://Han:p%40ssw0rd@test-cluster-ohp2e.mongodb.net/test?retryWrites=true"
// MongoClient.connect(uri, function(err, client) {
//   if(err){
//     console.log('Error occurred while connecting to MongoDB Atlas...', err);
//  } else {
//    const db = client.db("Test-Cluster")
//    db.collection("ToDoListApp", function(err, collection){
//      collection.find().toArray(function(err, res){
//        callback(res)
//      });
//    });  // perform actions on the collection object
//  db.close();
// }
// });


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
