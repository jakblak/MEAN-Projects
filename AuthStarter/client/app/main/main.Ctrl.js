(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth'];

  function MainCtrl($scope, $state, Auth) {
    $scope.user = Auth.getCurrentUser();

  }
})();