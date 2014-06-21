'use strict';

var gardnrApp = angular.module('gardnr-app', [
  'geo'
]);

gardnrApp.controller('MainCtrl', ['$scope', function ($scope) {
  $scope.startingLocation = {
    lat: 52.513480,
    lng: 13.393530
  }

  $scope.gardens = [
    {
      name: "Power Primeln",
      manager: "Alexander Hansen",
      icon: 'flower',
      price: {
        name: 'Best of Summer Competition',
        icon: 'batch',
        place: '1'
      },
      address: {
        city: 'Berlin',
        postal: '10405',
        street: 'Prenzlauer Allee 219',
        location: [13.393530, 52.513480]
      }
    }
  ];

  $scope.manuelsMerchantId = "RALBAY2LYDHSS";
}]);
