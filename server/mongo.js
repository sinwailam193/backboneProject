var mongoose = require('mongoose');

mongoose.connect();

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;