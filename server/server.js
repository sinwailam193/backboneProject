var express = require('express');
var session = require('express-session');
var mongo = require('./mongo');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
var server = require('http').Server(app);//need to set it up this way for socket.io
var io = require('socket.io')(server);//require socket.io
server.listen(port);

var main = __dirname.split("/")
main.pop();
main = main.join("/");
app.use(express.static(main + "/public"));
app.use(session({
  secret: 'this is a secret',
  saveUninitialized: true,
  resave: true
}));
app.use(bodyParser.json()); //parse the req body so we can actually see the data

var track;

app.get('/sess', function(req, res){
  track = req.session;
  if(track.username){
    res.json(track.username);
  }
  else{
    res.json('none');
  }
});

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

app.get('/text', function(req, res){
  mongo.Post.find(function(err, messages){
    if(err){
      res.send(500, 'There was an error - tough luck.');
    }
    else{
      res.json(messages);
    }
  })
})

app.post('/close', function(req, res){
  track = req.session;
  track.destroy(function(){});
})

app.post('/blogs', function(req, res){
  var blog = new mongo.Blog(req.body);
  blog.save();
});

app.post('/text', function(req, res){
  track = req.session;
  if(!track.username){
    track.regenerate(function(err) {
      if(err){
        console.log(err);
      }
    });
    track.username = req.body.username;
    track.save(function(){});
  }

  var text = new mongo.Post(req.body);
  text.save();
})

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


io.sockets.on('connection', function(socket){
  socket.on('chat', function(){
    socket.emit('chat', {});
    socket.broadcast.emit('chat', {});
  });

  socket.on('change', function(){
    socket.emit('change', {});
    socket.broadcast.emit('change', {});
  })
});

console.log("listening on " + port);
