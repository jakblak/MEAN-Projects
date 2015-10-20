(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyLooksCtrl', MyLooksCtrl);

  MyLooksCtrl.$inject = ['$scope', 'Auth', '$state', 'looksAPI'];

  function MyLooksCtrl($scope, Auth, $state, looksAPI) {

    if (!Auth.isLoggedIn()) {
      $state.go('login');
    }

    $scope.userEmail = Auth.getUserEmail();

    // Get all User Looks
    looksAPI.getUserLooks($scope.userEmail)
      .then(function(results) {
        console.log(results);
        $scope.userLooks = results;
      });

  }
})();