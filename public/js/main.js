$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    var id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/task/' + id,
      success: function(respnse){
        alert('deleted task!');
        window.location.href = '/';
      },
      error: function(err){
        console.log();
      }
    });
  });
});
