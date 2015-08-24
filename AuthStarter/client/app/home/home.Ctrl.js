'use strict';

angular.module('app')
.controller('HomeCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
  $scope.title = 'HomePage';

  if (Auth.isLoggedIn()){
    $location.path('/main');
  }

}]);