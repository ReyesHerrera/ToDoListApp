$(document).ready(function () {

$('.delete-task').on('click', function (e) {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/tasks/' +id,
      success: function(respnse){
        alert('deleted task!');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});