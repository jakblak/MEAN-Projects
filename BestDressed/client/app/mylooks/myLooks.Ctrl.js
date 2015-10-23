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
    $scope.userLooks = [];

    // Get all User Looks
    looksAPI.getUserLooks($scope.userEmail)
      .then(function(results) {
        console.log(results);
        $scope.userLooks = results;
      });

      $scope.editLook = function(id) {
        // edit here
      }

      $scope.delete = function(look) {
       var index = $scope.userLooks.indexOf(look);

       looksAPI.deleteLook(look)
        .success(function(data) {
          $scope.userLooks.splice(index, 1);
          console.log('success, Look deleted ');
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      }

  }
})();