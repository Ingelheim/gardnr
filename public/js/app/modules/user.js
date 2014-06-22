/**
 * Author: Thomas Schiela
 * Date: 21.06.2014
 * Time: 23:05
 */

var profile = angular.module('profile', [
]);


profile.controller('UserCtrl', ['$scope', 'brainTreeService', function ($scope, brainTreeService) {
  $scope.loading = false;

  $scope.user = {
    firstname: 'Lisa',
    lastname: 'Berg',
    street: 'Alexanderstr. 3',
    email: 'lisa.berg@gmx.de',
    merchantId: ''
  };

  $scope.register = function(firstName, lastName, email) {
    $scope.loading = true;

    brainTreeService.register(firstName, lastName, email)
    .success(function(result) {
      console.log('successfully registered: ', result);
        $scope.loading = false;
      $scope.user.merchantId = result.merchantAccount.id;
    })
    .error(function(err) {
        $scope.loading = false;
      console.log(err)
    });

  };

}]);
