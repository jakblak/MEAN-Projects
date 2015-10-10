(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', 'Auth', '$state'];

  function HomeCtrl($scope, Auth, $state) {
    $scope.title = 'Home Page';

    if (Auth.isLoggedIn()) {
      $state.go('main');
    }
  }

})();