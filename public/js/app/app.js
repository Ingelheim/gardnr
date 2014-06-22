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
      reloadOnSearch: false,
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
    .when('/garden/map', {
      templateUrl: '/views/GardenView.html',
      controller: 'GardenCtrl'
    })
    .otherwise('/map');
}]);

gardnrApp.controller('MapCtrl', [
  '$rootScope',
  '$scope',
  '$http',
  '$route',
  '$location',
  '$timeout',
  'GeocodeService',
  'LocationPickService',
  'brainTreeService',
  function ($rootScope, $scope, $http, $route, $location, $timeout, GeocodeService, LocationPickService, brainTreeService) {
  $scope.loading = false;

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

  $scope.gardens = [
    {
      name: "Power Primeln",
      manager: {
        name: 'Maria Thien',
        email: 'maria.thien@gmx.de',
        merchantId: 'maria_thien_instant_8sznz223'
      },
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
      manager: {
        name: 'Anna Sieners',
        email: 'anna.sieners@gmail.com',
        merchantId: ''
      },
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
      manager: {
        name: 'Alexander Hansen',
        email: 'alex@hansens.com',
        merchantId: ''
      },
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



gardnrApp.directive('radio', function ($timeout) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function ($scope, $element, $attributes, ngModel) {
      var value = $attributes.radio;

      $timeout(function () {
        if (ngModel.$modelValue == value) {
          $element.addClass('active');
        }
      });

      $element.on('click', function () {
        $('.btn-group .btn').each(function () {
          $(this).removeClass('active');
        });

        $element.addClass('active');

        if (ngModel) {
          $scope.$apply(function () {
            ngModel.$setViewValue(value);
          });
        }
      });
    }
  }
});
