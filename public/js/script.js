Backbone.Model.prototype.idAttribute = '_id'; //changing the id format from "id" to "_id"

var Blog = Backbone.Model.extend({
  defaults: {
    author: "",
    title: "",
    url: ""
  }
})
//------------------------------------------------------------------->
var Blogs = Backbone.Collection.extend({
  url: '/blogs'
});

var blogs = new Blogs();// instantiate

// //------------------------------------------------------------------->
var BlogView = Backbone.View.extend({
  model: new Blog(),
  tagName: 'tr',
  initialize: function(){
    this.template = _.template($('.blogs-list-template').html());
  },
  events: {
    'click .edit-blog': 'edit',
    'click .update-blog': 'update',
    'click .cancel-blog': 'cancel',
    'click .delete-blog': 'delete'
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  edit: function(){
    this.$('.edit-blog').hide();
    this.$('.delete-blog').hide();
    this.$('.update-blog').show();
    this.$('.cancel-blog').show();

    var author = this.$('.author').html();
    var title = this.$('.title').html();
    var url = this.$('.url').html();

    this.$('.author').html('<input type="text" class="form-control author-update" value="' + author +'"/>');
    this.$('.title').html('<input type="text" class="form-control title-update" value="' + title +'"/>');
    this.$('.url').html('<input type="text" class="form-control url-update" value="' + url +'"/>');
  },
  update: function(){
    var author = this.$('.author .author-update').val();
    var title = this.$('.title .title-update').val();
    var url = this.$('.url .url-update').val();

    this.model.set('author', author);
    this.model.set('title', title);
    this.model.set('url', url);

    this.model.save(null);
  },
  cancel: function(){
    blogsView.render();
  },
  delete: function(){
    this.model.destroy(); //this also send to server the id to tell mongo we're deleting this data
  }
});
//------------------------------------------------------------------->

//------------------------------------------------------------------->the blogs collection is sent in and this invokes the blogview
var BlogsView = Backbone.View.extend({
  model: blogs,
  el: $('.blogs-list'),
  initialize: function(){
    var self = this;
    this.model.on('add', this.render, this);
    this.model.on('change', function(){
      //we're putting in an annoymous function instead of this.render because it need some time to register the update changes
      setTimeout(function(){
        self.render();
      }, 30);
    }, this);
    this.model.on('remove', this.render, this);
    this.model.fetch() //fetching data from mongo
  },
  render: function(){
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(blog){
      self.$el.append((new BlogView({model: blog})).render().$el);
    });

    return this;
  }
});

new BlogsView();// instantiate
