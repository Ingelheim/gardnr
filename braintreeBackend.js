var braintree = require('braintree');


var ourMerchantId = '2cpmq4y2djfp6sn3';
var ourMasterMerchantId = '82k6wx6hhmc25rkc';

var braintreeGateWay = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: ourMerchantId,
  publicKey: 'rbzs8s9sht5mg5tp',
  privateKey: '3d86b13355e8b0503792a034236a8b3e'
});

exports.registerSubMerchant = function(req, res) {
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
}

exports.payment = function(req, res) {
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
}
