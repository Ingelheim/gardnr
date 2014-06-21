'use strict';

var gardnrApp = angular.module('gardnr-app', [
  'ngRoute',
  'ngResource',
  'geo'
]);

gardnrApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/map', {
      templateUrl: '/views/MapView.html',
      controller: 'MapCtrl'
    })
    .otherwise('/map');
}]);

gardnrApp.controller('MapCtrl', ['$scope', 'PaypalService', function ($scope, PaypalService) {

  $scope.startingLocation = {
    lat: 52.513480,
    lng: 13.393530
  }

  $scope.gardens = [
    {
      name: "Power Primeln",
      manager: "Alexander Hansen",
      icon: 'flower',
      lastUpdate: '2014-06-20T23:00:00.000Z',
      description: 'LOrem Ipsum dolor bla',
      slug: 'power-primeln',
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
    },
    {
      name: "Power Primeln",
      manager: "Alexander Hansen",
      icon: 'flower',
      lastUpdate: '2014-06-20T23:00:00.000Z',
      description: 'LOrem Ipsum dolor bla',
      slug: 'power-primeln',
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
    },
    {
      name: "Power Primeln",
      manager: "Alexander Hansen",
      icon: 'flower',
      lastUpdate: '2014-06-20T23:00:00.000Z',
      description: 'LOrem Ipsum dolor bla',
      slug: 'power-primeln',
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
    },
    {
      name: "Power Primeln",
      manager: "Alexander Hansen",
      icon: 'flower',
      lastUpdate: '2014-06-20T23:00:00.000Z',
      description: 'LOrem Ipsum dolor bla',
      slug: 'power-primeln',
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

  $scope.payment = function() {
    console.log('payment');
    PaypalService.payment();
  };

}]);
