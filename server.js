'use strict';

var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  http = require('http').Server(app),
  MongoClient = require('mongodb').MongoClient,
  format = require('util').format,
  paypal_sdk = require('paypal-rest-sdk'),
  braintree = require('./braintreeBackend');

var db = MongoClient.connect('mongodb://gardnr:gardnrApp123@ds048487.mongolab.com:48487/gardnr', function (err, db) {
  if (err) throw err;
  return db;
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/login', function (req, res) {
  res.render('login.html');
});

app.get('/register', function (req, res) {
  res.render('register.html');
});

app.get('/payment/:amount/:merchantId', braintree.payment);

app.post('/registerSubMerchant', braintree.registerSubMerchant);

var PORT = 8081;
http.listen(PORT);
console.log("App listening on port " + PORT);
