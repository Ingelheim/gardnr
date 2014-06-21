var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  MongoClient = require('mongodb').MongoClient,
  format = require('util').format;

var db = MongoClient.connect('mongodb://gardnr:gardnrApp123@ds048487.mongolab.com:48487/gardnr', function (err, db) {
  if (err) throw err;
  return db;
});

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});


var PORT = 8081;
http.listen(PORT);
console.log("App listening on port " + PORT);
