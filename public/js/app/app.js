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
      controller: 'GardenCtrl',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/map'
    });
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
  'GardenModel',
  function ($rootScope, $scope, $http, $route, $location, $timeout, GeocodeService, LocationPickService, brainTreeService, GardenModel) {
  $scope.loading = false;
  $scope.gardens = GardenModel.getAll();
  $scope.selectedGarden = null;

  $scope.locationPick = {
    enabled: $route.current.params.pickloc,
    location: []
  }

  $scope.startingLocation = {
    lat: 52.513480,
    lng: 13.393530
  }

  $scope.select = function(garden){
    $scope.selectedGarden = garden;
    $scope.startingLocation = {
      lat: garden.address.location[1],
      lng: garden.address.location[0]
    }
  }

  $scope.user = {
    firstname: 'Lisa',
    lastname: 'Berg',
    street: 'Alexanderstr. 3'
  }

  $scope.payment = brainTreeService.payment;

  $scope.openDonateModal = function(){
    $('#donateModal').modal('show');
  }

  $scope.doDonation = function(){
    $scope.loading = true;

    $timeout(function(){
      $scope.loading = false;
      $('#donateModal').modal('hide');
    }, 600);
  }

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

