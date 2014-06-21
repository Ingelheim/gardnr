var express = require('express');
var _ = require("underscore");
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});


var PORT = 8081;
http.listen(PORT);
console.log("App listening on port " + PORT);
