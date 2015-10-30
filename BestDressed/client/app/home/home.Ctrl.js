(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', 'Auth', '$state'];

  function HomeCtrl($scope, Auth, $state) {
    if (Auth.isLoggedIn()) {
      $state.go('main');
    }

    $scope.title = 'Home Page';
  }

})();