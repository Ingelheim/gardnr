'use strict';

angular.module('gardnr-app')
  .service('brainTreeService', ['$http', function ($http) {

  var service = {};

  service.register = function(firstName, lastName, email) {
    console.log('registering', firstName, lastName, email);

    var individual = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: "5553334444",
      dateOfBirth: "1981-11-19",
      address: {
        streetAddress: "111 Main St",
        locality: "Chicago",
        region: "IL",
        postalCode: "60622"
      }
    };
    return $http.post('/registerSubMerchant', individual);
  };

  service.payment = function(amount, managerId) {
    console.log('payment: ', amount, managerId);
    $http.get('/payment/' + amount + '/' + managerId)
    .success(function() {
      console.log('success')
    })
    .error(function(err) {
      console.log(err)
    });
  };

  return service;

}]);
