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


gardnrApp.controller('MapCtrl', ['$scope', 'brainTreeService', function ($scope, brainTreeService) {

  $scope.startingLocation = {
    lat: 52.513480,
    lng: 13.393530
  }

  $scope.user = {
    firstname: 'Lisa',
    lastname: 'Berg',
    street: 'Alexanderstr. 3'
  }


  $scope.gardens = [
    {
      name: "Power Primeln",
      manager: "Alexander Hansen",
      icon: 'flower',
      lastUpdate: '2014-06-20T23:00:00.000Z',
      description: 'LOrem Ipsum dolor bla',
      slug: 'power-primeln',
      members: 24,
      batch: true,
      distance: 200,
      address: {
        city: 'Berlin',
        postal: '10405',
        street: 'Prenzlauer Allee 219',
        location: [13.393530, 52.513480]
      }
    },
    {
      name: "Power Primeln 2",
      manager: "Alexander Hansen",
      icon: 'flower',
      lastUpdate: '2014-06-20T23:00:00.000Z',
      description: 'LOrem Ipsum dolor bla',
      slug: 'power-primeln2',
      members: 3,
      distance: 300,
      address: {
        city: 'Berlin',
        postal: '10405',
        street: 'Prenzlauer Allee 219',
        location: [13.393530, 52.593480]
      }
    },
    {
      name: "Power Primeln 3",
      manager: "Alexander Hansen",
      icon: 'flower',
      lastUpdate: '2014-06-20T23:00:00.000Z',
      description: 'LOrem Ipsum dolor bla',
      slug: 'power-primeln',
      members: 1,
      distance: 600,
      address: {
        city: 'Berlin',
        postal: '10405',
        street: 'Prenzlauer Allee 219',
        location: [13.43530, 52.513480]
      }
    }
  ];

  $scope.payment = brainTreeService.payment;

  $scope.register = brainTreeService.register;

}]);
