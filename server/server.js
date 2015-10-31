var express = require('express');
var mongo = require('./mongo');
var port = process.env.PORT || 3000;
var app = express();
 

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
  mongo.Post.find(function(err, posts) {
    if (err) {
        res.send(500, 'There was an error - tough luck.');
    }
    else {
        res.json(posts);
    }
  });
})

// app.get('/create', function(request, response) {
//   // TODO: Create and save a Post model
//   var post = new mongo.Post({ 
//     title: 'try again',
//     content: 'yes'
//   });

//   // TODO: Save the model
//   post.save(function(err, model) {
//     if (err) {
//       response.send(500, 'There was an error - tough luck.');
//     }
//     else {
//       response.redirect('/');
//     }
//   });
// });

app.listen(port);

console.log("listening on " + port);