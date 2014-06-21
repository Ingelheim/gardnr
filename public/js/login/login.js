'use strict';

var loginApp = angular.module('loginApp', [
]);

loginApp.controller('LoginCtrl', [
  '$scope',
  '$timeout',
  '$window',
  function ($scope, $timeout, $window) {
    $scope.loading = false;

    $scope.login = function(){
      $scope.loading = true;
      $timeout(function(){
        $scope.loading = false;
        $window.location.href = 'http://localhost:8081/#/map';
      }, 750);
    }
}]);
