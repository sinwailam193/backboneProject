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
      blog.save(null)
    }
  });
})
