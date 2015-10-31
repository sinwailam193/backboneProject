var mongoose = require('mongoose');
// var config = require('./config');

mongoose.connect(config);

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

exports.Post = mongoose.model('Post', postSchema);