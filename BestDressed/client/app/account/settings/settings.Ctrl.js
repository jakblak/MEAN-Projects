(function() {
  'use strict';

  angular
    .module('app')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['$scope', 'User', 'Auth', '$http', '$alert'];

  function SettingsCtrl($scope, User, Auth, $http, $alert) {
    $scope.user = Auth.getCurrentUser();


    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function() {
            $scope.message = 'Password successfully changed.';
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    }

  }
})();