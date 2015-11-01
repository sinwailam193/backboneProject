var Message = Backbone.Model.extend({
  defaults: {
    message: ""
  }
})

var Messages = Backbone.Collection.extend({
  url: '/text'
});

var message1 = new Message({
  message: "wtf is going on"
})
var messages = new Messages();

var MessageView = Backbone.View.extend({
  model: messages,
  el: $('#chatArea'),
  initialize: function(){
    this.model.on('add', this.render, this);
    this.model.fetch();
  },
  render: function(){
    var self = this;
    this.$el.val("");
    _.each(this.model.toArray(), function(text){
      var current = self.$el.val();
      self.$el.val(current + "Anonymous: " + text.toJSON().message + '\n');
    });
    return this;
  }
})

new MessageView();