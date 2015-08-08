(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddCtrl', AddCtrl);

    AddCtrl.$inject = ['Reports', 'Auth', '$scope'];

    function AddCtrl(Reports, Auth, $scope){
      console.log(Auth.getUserStatus());

      $scope.error = false;

      $scope.addForm = function() {

      }

      // Submit form to DB,
      // $scope.errorMessage = 'Form must be valid';
    }
})();