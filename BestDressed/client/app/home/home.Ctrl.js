(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', 'Auth', '$location'];

  function HomeCtrl($scope, Auth, $location) {
    $scope.title = 'HomePage';

    if (Auth.isLoggedIn()) {
      $location.path('/main');
    }
  }

})();