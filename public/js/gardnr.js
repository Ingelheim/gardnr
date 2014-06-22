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
  function ($rootScope, $scope, $http, $route, $location, $timeout,GeocodeService, LocationPickService, brainTreeService) {
  $scope.loading = false;

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
'use strict';

angular.module('gardnr-app')
  .service('brainTreeService', ['$http', function ($http) {

  var service = {};

  service.register = function() {
    console.log('registering');

    var individual = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@14ladders.com",
      phone: "5553334444",
      dateOfBirth: "1981-11-19",
      address: {
        streetAddress: "111 Main St",
        locality: "Chicago",
        region: "IL",
        postalCode: "60622"
      }
    };
    $http.post('/registerSubMerchant', individual)
    .success(function() {
      console.log('successfully registered')
    })
    .error(function(err) {
      console.log(err)
    });
  };

  service.payment = function(amount) {
    console.log('payment: ', amount);
    $http.get('/payment/' + amount)
    .success(function() {
      console.log('success')
    })
    .error(function(err) {
      console.log(err)
    });
  };

  return service;

}]);

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
  'brainTreeService',
  function ($rootScope, $scope, $http, $route, $location, $timeout,GeocodeService, LocationPickService, brainTreeService) {
    $scope.loading = false;

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

          // nasty hack, normally that should be go into a directve and service
          $('#newGardenModal').modal('show');
        }
      });
    }, true);

   $scope.close = function(){
      $scope.loading = true;

      $timeout(function(){
        $scope.loading = false;
        $('#newGardenModal').modal('hide');
        $scope.locationPick.enabled = false;
        $location.search('pickloc', null);
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

/**
 * Author: Thomas Schiela <thomas.schiel@gmail.com>
 */

angular.module('geo', [])
    .factory('GeocodeService', function ($http) {
      return {
        getGeoData: function (address, callback) {

          //address += " Deutschland";
          //&components=country:DE
          $http({method: 'GET', url: '//maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=false'}).
              success(function (data, status, headers, config) {
                callback(null, data.results[0])
              }).
              error(function (data, status, headers, config) {
                callback(data);
              });
        },
        // HTML5 geolocation
        getGeoLocation: function (callback) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                callback(null, position.coords);
              },
              function (error) {
                callback(error)
              },
              {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              });
          } else {
            callback({error: 'do not support geolocation'});
          }
        },
        getAddress: function(lat, lng, callback){
            $http({method: 'GET', url: '//maps.googleapis.com/maps/api/geocode/json?latlng='+lng+','+lat+'&sensor=true_or_false'}).
              success(function (data, status, headers, config) {
                callback(null, data)
              }).
              error(function (data, status, headers, config) {
                callback(data);
              });
        }
      }
    })
    .directive('googleplace', function() {
      return {
        require: 'ngModel',
        scope: {
          location: '='
        },
        link: function($scope, $element, $attributes, ngModel) {
          var options = {
            types: [],
            componentRestrictions: {}
          };
          $scope.gPlace = new google.maps.places.Autocomplete($element[0], options);

          google.maps.event.addListener($scope.gPlace, 'place_changed', function() {
            var place = $scope.gPlace.getPlace();

            $scope.$apply(function() {
              $scope.location = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              };

              ngModel.$setViewValue($element.val());
            });
          });
        }
      };
    })
    .directive('gmap', function($timeout, $rootScope){
      return {
        restrict: 'A',
        scope: {
          gmap: '=',
          markers: '=',
          imagePath: '=',
          locationPick: '='
        },
        link: function ($scope, $element, $attributes) {
          var options = {
            startLocation: {
              lat: 52.513480,
              lng: 13.393530
            },
            enableCloseButton: true,
            showBoxOn: 'mouseover',
            hideBoxOn: 'mouseout',
            boxCloseDelay: 300,
            mapElement: 'gna',
            mapContainerId: $element.attr('id'),
            imagePath: $scope.imagePath
          }

          var markers = [];
          var infoBoxEventListeners = [];
          var currentOpenMarker = null;
          var infoBoxIsOpen = false;
          var map;

          initMap();

          /**
           * watch the markers and update them on the map
           */
          $scope.$watch('markers', function(newValue, oldValue){
            if($scope.markers){

              $timeout(function(){
                if($scope.markers.length > 0){
                  for(var i = 0; i < $scope.markers.length; i++){
                    // check if only limit has changed (show more button was clicked)
                    addMarker(i, $scope.markers[i].address.location[1], $scope.markers[i].address.location[0]);
                  }

                  // zoom map to fitt all markers
                  var bounds = new google.maps.LatLngBounds ();

                  for (var i = 0; i < $scope.markers.length; i++) {
                    bounds.extend (new google.maps.LatLng ($scope.markers[i].address.location[1],$scope.markers[i].address.location[0]));
                  }

                  //  fit these bounds to the map
                  map.fitBounds (bounds);
                }
              });
            }
          }, true);


          /**
           * watch for new map center to rerender map
           */
          $scope.$watch('gmap', function(){
            if($scope.gmap && $scope.gmap.lat && $scope.gmap.lng){
              // remove all markers
              $scope.clear();

              // change center of map
              map.setCenter(new google.maps.LatLng($scope.gmap.lat, $scope.gmap.lng));
            }
          }, true);


          /**
           * init google map
           */
          function initMap(){
            // init map
            var mapOptions = {
              zoom: 12,
              center: new google.maps.LatLng(options.startLocation.lat, options.startLocation.lng),
              panControl: false,
              zoomControl: true,
              zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.LEFT_BOTTOM
              },
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              overviewMapControl: false,
              noClear: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              maxZoom: 18
            };

            if($scope.locationPick && $scope.locationPick.enabled){
              mapOptions.draggableCursor = 'crosshair';
            }

            map = new google.maps.Map(document.getElementById(options.mapContainerId), mapOptions);
          }

          /**
           * add a marker to the map
           * @param number
           * @param lat
           * @param lng
           */
          function addMarker(number, lat, lng){
            var marker,
                infobox;

            marker = new google.maps.Marker({
              map: map,
              position: new google.maps.LatLng(lat, lng),
              visible: true,
              icon: options.imagePath + 'marker.png'
            });

            var infoboxOptions = {
              content: document.getElementById('infobox-'+number),
              disableAutoPan: false,
              maxWidth: 150,
              pixelOffset: new google.maps.Size(0, -150),
              zIndex: null,
              boxStyle: {
                background: "url('" + options.imagePath + "tipbox.gif') no-repeat",
                opacity: 1,
                width: "280px"
              },
              closeBoxMargin: "12px 4px 2px 2px",
              closeBoxURL: "",
              infoBoxClearance: new google.maps.Size(1, 1),
              enableEventPropagation: true
            };

            marker.infobox = new InfoBox(infoboxOptions);

            // if mouse is over marker
            google.maps.event.addListener(marker, options.showBoxOn, function() {
              marker.infobox.open(map, this);

              // close last open marker infobox if new infobox will be open
              if(currentOpenMarker){
                if(currentOpenMarker != marker){
                  currentOpenMarker.infobox.close();
                }
              }

              currentOpenMarker = marker;
            });

            // if mouse leave marker
            google.maps.event.addListener(marker, options.hideBoxOn, function() {

              $timeout(function(){
                if(!infoBoxIsOpen){
                  marker.infobox.close();
                }
              }, options.boxCloseDelay);
            });

            // if mouse is over infobox
            infoBoxEventListeners.push(google.maps.event.addDomListener(infoboxOptions.content, 'mouseover', function(){
              infoBoxIsOpen = true;
            }));

            // if mouse is over infobox
            infoBoxEventListeners.push(google.maps.event.addDomListener(infoboxOptions.content, 'mouseout', function(event){
              // prevent for closing div if mouse is over content of infobox
              // thanks to Sam-Elie (http://stackoverflow.com/questions/4697758/prevent-onmouseout-when-hovering-child-element-of-the-parent-absolute-div/13141057#13141057)
              var e = event.toElement || event.relatedTarget;
              while(e && e.parentNode && e.parentNode != window) {
                if (e.parentNode == this||  e == this) {
                  if(e.preventDefault) e.preventDefault();
                  return false;
                }
                e = e.parentNode;
              }

              infoBoxIsOpen = false;
              marker.infobox.close();
            }));

            markers.push(marker);
          }

          /**
           * remove all markers from map an clear listeners
           */
          $scope.clear = function(){
            for(var i = 0; i < markers.length; i++){
              markers[i].setMap(null);
            }

            // remove all event listeners
            google.maps.event.clearListeners(map, options.showBoxOn);
            google.maps.event.clearListeners(map, options.hideBoxOn);

            for(var i = 0; i < infoBoxEventListeners.length; i++){
              google.maps.event.removeListener(infoBoxEventListeners[i]);
            }

            infoBoxEventListeners = [];
            markers = [];
          }

          if($scope.locationPick && $scope.locationPick.enabled){
            google.maps.event.addListener(map, 'click', function(event) {
              console.log(event.latLng);
              $rootScope.$emit('locationPicked', [event.latLng.A, event.latLng.k]);
            });
          }
        }
      }
    })
;

/**
 * Author: Thomas Schiela
 * Date: 21.06.2014
 * Time: 23:05
 */

var profile = angular.module('profile', [
]);


profile.controller('UserCtrl', ['$scope', function ($scope) {



}]);
