var express = require('express');
var router = express.Router();

/* GET addtask page. */
router.get('/', function(req, res, next) {
  addTaskRouter.find({}, function(err, tasks){
    if(err){
      console.log(err);
    }else{
      res.render('addTask', { title: 'ToDoListApp Adding a Task',
        tasks: tasks
      });
    }
  });
});

//Adding Submit Route
/*app.post('tasks/add', function(req,res){
    let tasks = new addTaskRouter();
    tasks.taskName = req.body.taskName
    tasks.
}*/

module.exports = router;
