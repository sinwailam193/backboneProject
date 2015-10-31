var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config); //'mongodb://localhost/test'

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

exports.Post = mongoose.model('Post', postSchema);