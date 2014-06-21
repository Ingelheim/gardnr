'use strict';

angular.module('gardnr-app').service('PaypalService', ['$http', function($http) {
  
  var service = {};

  // paypalSdk.configure({
  //   'mode': 'sandbox', //sandbox or live
  //   'client_id': 'AcrWFxD--quh-W6KNpcNlK97j7649oz9bq2A2-9tljWr8dxAwri7V_-f54RL',
  //   'client_secret': 'ECdNXhBr7DSycztxUe_IYqcxPKRF4h5U-feTW0YmQ2gOSizFNIxlDFzElrJV'
  // });

  service.payment = function () {
    $http.get('/payment')
    .success(function() {
      console.log('success')
    })
    .error(function(err) {
      console.log(err)
    })
  };

  return service;

}]);
