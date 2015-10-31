var express = require('express');
var Post = require('./mongo');
var port = process.env.PORT || 3000;
var app = express();
 

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.send('hello world');
})

app.listen(port);

console.log("listening on " + port);