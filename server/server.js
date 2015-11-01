var express = require('express');
var mongo = require('./mongo');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
 
var main = __dirname.split("/")
main.pop();
main = main.join("/");
app.use(express.static(main + "/public"));
app.use(bodyParser.json()); //parse the req body so we can actually see the data

app.get('/blogs', function(req, res){
  mongo.Blog.find(function(err, blogs){
    if(err){
      res.send(500, 'There was an error - tough luck.');
    }
    else{
      res.json(blogs);
    }
  })
});

app.post('/blogs', function(req, res){
  var blog = new mongo.Blog(req.body);
  blog.save();
});

app.delete('/blogs/:id', function(req, res){
  var blogID = req.params.id;
  mongo.Blog.remove({_id: blogID}, function(err){
    if(err){
      console.log('error in deleting!!');
    }
  });
});

app.put('/blogs/:id', function(req, res){
  var blogID = req.params.id;
  mongo.Blog.update({_id: blogID}, req.body, function(err){
    if(err){
      console.log('error in updating!!');
    }
  })
})

app.listen(port);

console.log("listening on " + port);
