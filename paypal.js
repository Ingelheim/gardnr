var paypal_sdk = require('paypal-rest-sdk');

paypal_sdk.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AcrWFxD--quh-W6KNpcNlK97j7649oz9bq2A2-9tljWr8dxAwri7V_-f54RL',
  'client_secret': 'ECdNXhBr7DSycztxUe_IYqcxPKRF4h5U-feTW0YmQ2gOSizFNIxlDFzElrJV'
});

var card_data = {
  "type": "visa",
  "number": "4417119669820331",
  "expire_month": "11",
  "expire_year": "2018",
  "cvv2": "123",
  "first_name": "Joe",
  "last_name": "Shopper"
};

paypal_sdk.credit_card.create(card_data, function(error, credit_card) {
  if (error) {
    console.log(error);
    throw error;
  } else {
    console.log("Create Credit-Card Response");
    console.log(credit_card);
  }
})
