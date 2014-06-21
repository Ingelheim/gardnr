var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    mongoose = require("mongoose"),
    database = require('./db/dbConnection');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});


var PORT = 8081;
http.listen(PORT);
console.log("App listening on port " + PORT);
