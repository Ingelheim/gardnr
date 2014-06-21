'use strict';

var gardnrApp = angular.module('gardnr-app', []);

gardnrApp.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.test = "HELLO ANGULAR WORKS";
}]);


