var Blog = Backbone.Model.extend({
  defaults: {
    author: "",
    title: "",
    url: ""
  }
})

var Blogs = Backbone.Collection.extend({

});

var blog1 = new Blog({
  author: "Aaron",
  title: "awesome blog",
  url: "http://cool.com"
});

var blog2 = new Blog({
  author: "Dude",
  title: "awesome blog 2.0",
  url: "http://coolDude.com"
});

var blogs = new Blogs([blog1, blog2]);

var BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function(){
    this.template = _.template($('.blog-list-template').html());
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this
  }
});

var BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function(){
    this.model.on('add', this.render(), this);
  },
  render: function(){
    var self = this;

    this.$el.html('');
    _.each(this.model.toArray(), function(blog){
      self.$el.append((new BlogView({model: blog})).render().$el);
    });
  }
});







