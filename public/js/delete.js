$('buttons.remove.doc').on('click', function() {
   var taskName = $(this).attr('tasks._id');
   $.ajax({
      method: "POST",
      url: "/tasks/delete",
      data: {"tasksId": taskId},
      success: function(result) {
         if(/* check if it is ok */) {
             location.reload();
         }
      }
   })
});
