/**
 * Author: Thomas Schiela
 * Date: 21.06.2014
 * Time: 23:05
 */

var garden = angular.module('garden', []);

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
      .path('/garden/map')
      .search('pickloc');
  }
}]);

garden.controller('GardenCtrl', [
  '$rootScope',
  '$scope',
  '$http',
  '$route',
  '$location',
  '$timeout',
  'GeocodeService',
  'LocationPickService',
  'GardenModel',
  function ($rootScope, $scope, $http, $route, $location, $timeout, GeocodeService, LocationPickService, GardenModel) {
    $scope.loading = false;
    $scope.gardens = [];

    $scope.newGarden = {
      name: "",
      manager: {
        name: 'Lisa Berg',
        email: 'lisa.berg@gmail.com'
      },
      icon: '',
      lastUpdate: '2014-06-22T14:30:00.000Z',
      description: '',
      slug: 'seed-camp',
      members: 1,
      distance: 0,
      address: {
        city: '',
        postal: '',
        street: '',
        location: []
      }
    }

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

          $scope.newGarden.address = {
            city: city,
            postal: postal,
            street: street,
            location: [data[0], data[1]]
          }

          GardenModel.add($scope.newGarden);
          $scope.gardens.push(GardenModel.getLast());

          // nasty hack, normally that should be go into a directve and service
          $('#newGardenModal').modal('show');
        }
      });
    }, true);

    $scope.donate = function(){
      $('#donateModal').modal('show');
    }

    $scope.close = function(){
      $scope.loading = true;

      $timeout(function(){
        $scope.loading = false;
        $('#newGardenModal').modal('hide');
        $scope.locationPick.enabled = false;
        $location.search('pickloc', null);
      }, 600);
    }

    $scope.doDonation = function(){
      $scope.loading = true;

      $timeout(function(){
        $scope.loading = false;
        $('#donateModal').modal('hide');
      }, 600);
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

garden.factory('GardenModel', function () {
  var _gardens = [
    {
      name: "Power Primeln",
      manager: {
        name: 'Maria Thien',
        email: 'maria.thien@gmx.de'
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
        email: 'anna.sieners@gmail.com'
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
        email: 'alex@hansens.com'
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

  return {
    getAll: function () {
      return _gardens;
    },
    getLast: function(){
      return _gardens[_gardens.length - 1];
    },
    add: function(garden){
      _gardens.push(garden);
    }
  }
});
