'use strict';

var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  http = require('http').Server(app),
  MongoClient = require('mongodb').MongoClient,
  format = require('util').format,
  paypal_sdk = require('paypal-rest-sdk'),
  braintree = require('braintree');


var ourMerchantId = '2cpmq4y2djfp6sn3';
var ourMasterMerchantId = '82k6wx6hhmc25rkc';

var braintreeGateWay = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: ourMerchantId,
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

app.get('/payment/:amount', function(req, res) {
  console.log(req.params.amount);
  braintreeGateWay.transaction.sale({
    amount: '' + req.params.amount,
    // merchantAccountId: anotherTestMerchantId,
    creditCard: {
      number: '4111111111111111',
      expirationMonth: '05',
      expirationYear: '12'
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
      res.send(500);
    } else if (result && result.success) {
      console.log('Transaction: ' + result.transaction);
      res.send(result);
    } else {
      console.log('something wrong, result: ', result);
      res.send(500);
    }
  });
});

app.post('/registerSubMerchant', function(req, res) {
  console.log(req.body);
  var merchantAccountParams = {
    individual: req.body,
    funding: {
      destination: braintree.MerchantAccount.FundingDestination.Bank,
      accountNumber: "1123581321",
      routingNumber: "071101307"
    },
    tosAccepted: true,
    masterMerchantAccountId: ourMasterMerchantId
  };

  console.log('Sending merchantAccountParams:', merchantAccountParams);

  braintreeGateWay.merchantAccount.create(merchantAccountParams, function (err, result) {
    if (err) {
      console.error(err);
      res.send(500);
    } else if (result && result.success) {
      console.log('result: ' + result);
      res.send(result);
    } else {
      console.log('something wrong, result: ', result);
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
