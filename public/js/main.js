$(document).ready(function(){
  
  var from,to,subject,text;
  $("#send_email").click(function(){
      to=$("#to").val();
      $("#message").text("Sending E-mail...Please wait");
      $.get("http://localhost:3000/send",{to:to},function(data){
      if(data=="sent")
      {
          $("#message").empty().html("<p>Email is been sent at "+to+" . Please check inbox !</p>");
      }

    });
  });

  $('.delete-task').on('click', function(e){
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
