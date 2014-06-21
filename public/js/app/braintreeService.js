'use strict';

angular.module('gardnr-app')
  .service('brainTreeService', ['$http', function ($http) {

  var service = {};

  service.register = function() {
    console.log('registering');

    var individual = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@14ladders.com",
      phone: "5553334444",
      dateOfBirth: "1981-11-19",
      address: {
        streetAddress: "111 Main St",
        locality: "Chicago",
        region: "IL",
        postalCode: "60622"
      }
    };
    $http.post('/registerSubMerchant', individual)
    .success(function() {
      console.log('successfully registered')
    })
    .error(function(err) {
      console.log(err)
    });
  };

  service.payment = function(amount) {
    console.log('payment: ', amount);
    $http.get('/payment/' + amount)
    .success(function() {
      console.log('success')
    })
    .error(function(err) {
      console.log(err)
    });
  };

  return service;

}]);
