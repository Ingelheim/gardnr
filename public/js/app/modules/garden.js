/**
 * Author: Thomas Schiela
 * Date: 21.06.2014
 * Time: 23:05
 */

var garden = angular.module('garden', [
]);


garden.controller('NewGardenCtrl', [
  '$scope',
  '$location',
  'LocationPickService',
  function ($scope, $location, LocationPickService) {
  $scope.garden = {
    address: null
  }

  $scope.steps = [
    {
      completed: false
    },
    {
      completed: false
    },
    {
      completed: false
    }
  ];

  $scope.pickedLocation = LocationPickService.getAddress();

  if($scope.pickedLocation.city){
    $scope.garden.address = $scope.pickedLocation;
  }




  $scope.pickLocation = function(){
    $location
      .path('map')
      .search('pickloc');
  }
}]);

garden.factory('LocationPickService', function () {
  var _street;
  var _postal;
  var _city;

  return {
    setAddress: function (street, postal, city) {
      _street = street;
      _postal = postal;
      _city = city;
    },
    getAddress: function(){
      return {
        street: _street,
        postal: _postal,
        city: _city
      }
    }
  }
});
