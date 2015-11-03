var socket = io.connect();
socket.on('chat', function () {
  messageView.model.fetch();
});
socket.on('change', function(){
  blogsView.model.fetch();
})

$.get( "/sess", function(data) {
  if(data === "none"){
    $('.usernew').hide();
  }
  else{
    $('.username-input').val(data);
    $('.username-input').hide();
    $('.username').html(data);
    $('.username').show();
  }
});

$(function(){
  $('.add-blog').on('click', function(){
    if($('.author-input').val() && $('.title-input').val() && $('.url-input').val()){
      var blog = new Blog({
        author: $('.author-input').val(),
        title: $('.title-input').val(),
        url: $('.url-input').val()
      });
      blogs.add(blog);
      $('.author-input').val('');
      $('.title-input').val('');
      $('.url-input').val('');
      blog.save(null);
      socket.emit('change');
    }
  });

  $('.send-text').on('click', function(){
    if($('.text-input').val()){
      var user = $('.username-input').val();
      var message = new Message({
        username: user,
        message: $('.text-input').val()
      });
      if($('.username-input').val()){
        $('.username-input').hide();
        $('.username').html(user);
        $('.username').show();
        $('.usernew').show();
      }
      messages.add(message);
      $('.text-input').val('')
      message.save(null);
      socket.emit('chat')//telling socket there is something changing
    }
  })

  $('.usernew').on('click', function(){
    $.post( "/close", {});
    $('.username-input').val('');
    $('.username-input').show();
    $('.username').html('');
    $('.username').hide();
    $('.usernew').hide();
  })
})
