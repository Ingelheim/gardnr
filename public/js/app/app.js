'use strict';

var gardnrApp = angular.module('gardnr-app', [
  'ngRoute',
  'ngResource',
  'geo',
  'profile',
  'garden'
]);

gardnrApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/map', {
      templateUrl: '/views/MapView.html',
      controller: 'MapCtrl'
    })
    .when('/profile/:userSlug', {
      templateUrl: '/views/UserView.html',
      controller: 'UserCtrl'
    })
    .when('/garden/new', {
      templateUrl: '/views/NewGardenView.html',
      controller: 'NewGardenCtrl'
    })
    .otherwise('/map');
}]);


gardnrApp.controller('MapCtrl', [
  '$rootScope',
  '$scope',
  '$http',
  '$route',
  '$location',
  'GeocodeService',
  'LocationPickService',
  function ($rootScope, $scope, $http, $route, $location, GeocodeService, LocationPickService) {

  $scope.locationPick = {
    enabled: $route.current.params.pickloc,
    location: []
  }

  $scope.startingLocation = {
    lat: 52.513480,
    lng: 13.393530
  }

  $scope.user = {
    firstname: 'Lisa',
    lastname: 'Berg',
    street: 'Alexanderstr. 3'
  }

  $rootScope.$on('locationPicked', function(event, data){
    GeocodeService.getAddress(data[0], data[1], function(error, address){
      if(error){
        console.log(error);
      } else {
        var street = address.results[0].address_components[1].long_name + ' ' + address.results[0].address_components[0].long_name;
        var city = "Berlin";
        var postal = "10405";

        for(var i = 0, len = address.results[0].address_components.length; i < len; i++){
          if(address.results[0].address_components[i].types[0] == 'locality'){
            city = address.results[0].address_components[i].long_name;
          }

          if(address.results[0].address_components[i].types[0] == 'postal_code'){
            postal = address.results[0].address_components[i].long_name;
          }
        }

        LocationPickService.setAddress(street, postal, city);
        $location.path('/garden/new');
      }
    });
  }, true);


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

  $scope.payment = function(amount) {
    console.log('payment: ', amount);
    $http.get('/payment/' + amount)
    .success(function() {
      console.log('success')
    })
    .error(function(err) {
      console.log(err)
    });
  };

}]);
