(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyLooksCtrl', MyLooksCtrl);

  MyLooksCtrl.$inject = ['$scope', 'Auth', '$state', '$modal', '$alert', 'looksAPI'];

  function MyLooksCtrl($scope, Auth, $state, $modal, $alert, looksAPI) {

    if (!Auth.isLoggedIn()) {
      $state.go('login');
    }

    $scope.userEmail = Auth.getUserEmail();

    // Get all User Looks   -  if using $resource use .query instead of .then
    looksAPI.getUserLooks($scope.userEmail)
      .then(function(results) {
        console.log(results);
        $scope.userLooks = results;
      });

  }
})();