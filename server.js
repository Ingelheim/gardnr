'use strict';

var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  MongoClient = require('mongodb').MongoClient,
  format = require('util').format,
  paypal_sdk = require('paypal-rest-sdk');

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
  var payment_details = {
    "intent": "sale",
    "payer": {
      "payment_method": "credit_card",
      "funding_instruments": [{
        "credit_card": {
          "type": "visa",
          "number": "4417119669820331",
          "expire_month": "11",
          "expire_year": "2018",
          "cvv2": "874",
          "first_name": "Joe",
          "last_name": "Shopper",
          "billing_address": {
            "line1": "Hauptstraße 123",
            "city": "Berlin",
            "state": "Berlin",
            "postal_code": "56789",
            "country_code": "DE" }}}]},
    "transactions": [{
      "amount": {
        "total": "7.47",
        "currency": "EUR"
      },
      "description": "This is the payment transaction description." }]
  };

  paypal_sdk.payment.create(payment_details, function(error, payment){
    if(error){
      console.error(error);
      res.send(500);
    } else {
      // console.log(payment);
      res.send({success: 'kjh'});
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
