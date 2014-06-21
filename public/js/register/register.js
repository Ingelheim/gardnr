'use strict';

var registerApp = angular.module('registerApp', [
  'ngRoute'
]);

registerApp.controller('RegisterCtrl', [
  '$scope',
  '$timeout',
  function ($scope, $timeout) {
    $scope.showSuccess = false;
    $scope.loading = false;

    $scope.register = function(){
      $scope.loading = true;
      $timeout(function(){
        $scope.showSuccess = true;
        $scope.loading = false;
      }, 750);
    }
}]);
