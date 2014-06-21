'use strict';

angular.module('gardnr-app').service('PaypalService', ['$http', function($http) {
  
  var service = {};

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
