'use strict';

var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  MongoClient = require('mongodb').MongoClient,
  format = require('util').format,
  paypal_sdk = require('paypal-rest-sdk'),
  braintree = require('braintree');

var braintreeGateWay = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: '2cpmq4y2djfp6sn3',
  publicKey: 'rbzs8s9sht5mg5tp',
  privateKey: '3d86b13355e8b0503792a034236a8b3e'
});

paypal_sdk.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AcrWFxD--quh-W6KNpcNlK97j7649oz9bq2A2-9tljWr8dxAwri7V_-f54RL',
  'client_secret': 'ECdNXhBr7DSycztxUe_IYqcxPKRF4h5U-feTW0YmQ2gOSizFNIxlDFzElrJV'
});

var db = MongoClient.connect('mongodb://gardnr:gardnrApp123@ds048487.mongolab.com:48487/gardnr', function (err, db) {
  if (err) throw err;
  return db;
});

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/payment', function(req, res) {
  braintreeGateWay.transaction.sale({
    amount: '5.00',
    creditCard: {
      number: '4111111111111111',
      expirationMonth: '05',
      expirationYear: '12'
    }
  }, function (err, result) {
    if (err) {
      res.send(500);
    }

    if (result.success) {
      console.log('Transaction: ' + result.transaction);
      res.send(result);
    } else {
      console.log(result.message);
      res.send(500);
    }
  });
});

app.get('/payments', function(req, res) {
  paypal_sdk.payment.list({ "count": 10 }, function(error, payment_history){
    if(error){
      console.error(error);
      res.send(500);
    } else {
      res.send(payment_history);
    }
  });
});



var PORT = 8081;
http.listen(PORT);
console.log("App listening on port " + PORT);
