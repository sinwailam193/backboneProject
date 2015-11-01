var socket = io.connect();
socket.on('chat', function () {
  new MessageView();
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
    }
  });

  $('.send-text').on('click', function(){
    socket.emit('chat')//telling socket there is something changing
    var message = new Message({
      message: $('.text-input').val()
    });
    messages.add(message);
    $('.text-input').val('')
    message.save(null);
  })
})
