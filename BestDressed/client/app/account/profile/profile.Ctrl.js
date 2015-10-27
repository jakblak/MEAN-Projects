(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', '$state', 'Auth', 'adminAPI'];

  function ProfileCtrl($scope, $state, Auth, adminAPI) {
    if (!Auth.isLoggedIn()) {
      $state.go('login');
    }

    $scope.user = Auth.getCurrentUser();
    $scope.profileInfo = {};
    var id = $scope.user._id;

    adminAPI.getOneUser(id)
      .then(function(data) {
        console.log(data);
        $scope.profileInfo = data;
      })
      .catch(function(err) {
        console.log('failed to get data ', err);
      });

  }
})();