var Message = Backbone.Model.extend({
  defaults: {
    username: "",
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
      var username = text.toJSON().username || "Anonymous";
      self.$el.val(current + username + ": " + text.toJSON().message + '\n');
    });
    return this;
  }
})

new MessageView();