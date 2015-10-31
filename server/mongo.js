var mongoose = require('mongoose');
if (process.env.config === undefined){
  var config = require('./config');
}
else { //if we are on Heroku, just set the environment variable to the heroku environment variable
  var config = process.env.config
}

mongoose.connect(config);

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

exports.Post = mongoose.model('Post', postSchema);