var  express = require('express');
var json = require('JSON');
var cookie = require('set-cookie');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsonParser = require('json-parser');
var request = require('request');
var fs = require('fs');
var router = express.Router();
var app = express();
var port = 3000;

app.use(cookieParser());
app.use(bodyParser());

var Task2_Answer;
var author = "https://jsonplaceholder.typicode.com/users";
var posts = "https://jsonplaceholder.typicode.com/posts";
var det_author;
var det_posts;
request({
  url : author,
  json : true}, function(err,res,body){
    if(!err && res.statusCode === 200) {
      det_author = body;
      console.log('Author data Feteched succesfully\n');
    }
    else {
        console.log('Error in Feteching Author data\n');
    }
  });
request({
    url : posts,
    json : true}, function(err,res,body){
    if(!err && res.statusCode === 200) {
      det_posts = body;
      console.log('Posts data Feteched succesfully\n');
    }
    else {
        console.log('Error in Feteching Posts data\n');
    }
  });

// Start of Task - 1

app.get('/',function(req,res) {
  res.send("Hello, world! - Kailashnath");
});
// End of Task - 1

// Start of Task - 2

app.get('/authors',function(req,res) {
  if(Task2_Answer == undefined && det_posts != undefined && det_author != undefined) {
    Task2_Answer = 'Author Name - Count <br><br>';
    for(auth in det_author) {
      var count = 0;
      var name = det_author[auth].name;
      var id = det_author[auth].id;
      for(var pos in det_posts) {
        if(det_posts[pos].userId === id)
          count += 1;
      }
      Task2_Answer = Task2_Answer + name +' - ' + count + '<br>';
    }
  }
  else {
    res.send('Try again after some time :(');
  }
  res.send(Task2_Answer);
});
// End of Task - 2

// Start of Task - 3

app.get('/setcookie', function(req, res){
  var cookie = req.cookies.cookie;
  if(cookie == undefined) {
    var name = 'Kailashnath'
    var age = 19
    res.cookie('cookie',{name, age});
    console.log('cookie set succesfully\n');
    res.send('cookie set succesfully');
  }
  else {
    console.log('cookie already exist\n');
    res.send('cookie already exist');
  }
});
// End of Task - 3

// Start of Additional - Delete the set cookie

app.get('/deletecookie', function(req,res){
  res.clearCookie('cookie');
  res.send('Cookie Deleted');
  console.log('Cookie cleared\n');
});
// End of Additional - Delete the set cookie

// Start of Task - 4

app.get('/getcookie',function(req,res){
  var cookie = req.cookies.cookie;
  console.log(cookie);
  if(cookie == undefined) {
    console.log('cookie doesn\'t exist \n');
    res.send('cookie doesn\'t exist');
  }
  else {
    console.log('cookie already exist \n');
    res.send(cookie.name + " - " + cookie.age);
  }
});
// End of Task - 4

// Start of Task - 5

app.get('/robots.txt', function(req, res) {
  res.send(`YOU SHOULDN'T BE HERE`)
});
// End of Task - 5;

// Start of Task - 6

app.get('/html',function(req, res){
  res.sendFile(__dirname + '/html' + '/render.html');
});
// End of Task - 6

// Start of Task - 7

app.get('/getinput', function(req, res) {
  res.sendFile(__dirname + '/html' + '/input.html');
});

app.post('/storeinput', function(req, res) {
  var data = req.body.data;
  data += '\n';
  fs.appendFile('data.txt', data, function(err){
    if (err) {
      console.log(err);
      console.log("Error in Writing data");
      console.log("Data : " + data);
      res.send("Error in Writing data");
    }
    else {

        console.log("Successfully Written to File.");
        console.log("Data : " + data);
        res.send("Successfully Written to File.")
    }
  });
});
// End of Task - 7

var server = app.listen(port, function() {
  console.log('Server running at http://localhost:' + server.address().port +'\n')
});
