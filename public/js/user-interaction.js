var socket = io.connect();
socket.on('chat', function () {
  new MessageView()
});
socket.on('change', function(){
  new BlogsView();
})

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
    var user = $('.username-input').val();
    var message = new Message({
      username: user,
      message: $('.text-input').val()
    });
    if($('.username-input').val()){
      $('.username-input').hide();
      $('.username').html(user);
      $('.username').show();
    }
    messages.add(message);
    $('.text-input').val('')
    message.save(null);
    socket.emit('chat')//telling socket there is something changing
  })
})
