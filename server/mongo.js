var mongoose = require('mongoose');
var config = process.env.config || require('./config');

mongoose.connect(config);

var postSchema = new mongoose.Schema({
  message: String
});

var blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    url: String
})

exports.Post = mongoose.model('Post', postSchema);
exports.Blog = mongoose.model('Blog', blogSchema);