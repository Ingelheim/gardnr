'use strict';

var gardnrApp = angular.module('gardnr-app', [
  'geo'
]);

gardnrApp.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.startingLocation = {
    lat: 52.513480,
    lng: 13.393530
  }

  $scope.markers = [
    {
      name: "Power Primeln",
      address: {
        location: [13.393530, 52.513480]
      }
    },
    {
      name: "Power Primeln",
      address: {
        location: [13.453530, 52.23480]
      }
    },
    {
      name: "Power Primeln",
      address: {
        location: [13.43530, 52.73480]
      }
    }
  ];
}]);


