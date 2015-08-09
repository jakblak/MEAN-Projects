(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddCtrl', AddCtrl);

  AddCtrl.$inject = ['Reports', 'Auth', '$scope', '$alert'];

  function AddCtrl(Reports, Auth, $scope, $alert) {
    console.log(Auth.getUserStatus());

    $scope.error = false;
    $scope.formField = null;

    $scope.addForm = function() {
      var report = {
        memberName: $scope.memberName,
        project: $scope.project,
        workYesterday: $scope.workYesterday,
        workToday: $scope.workToday,
        notes: $scope.notes
      }
      Reports.postReport(report)
        .success(function() {
          console.log('Report added to DB');
          $scope.memberName = '';
          $scope.project = '';
          $scope.workYesterday = '';
          $scope.workToday = '';
          $scope.notes = '';
          $alert({
            title: 'Report Saved ',
            content: 'New report has been added',
            placement: 'top-right',
            container: '#alertContainer',
            type: 'success',
            duration: 8
          });
        })
        .error(function() {
          console.log('report failed to add to DB');
          $scope.error = true;
          $scope.errorMessage = 'Report failed to save';
        });
    }

    // Submit form to DB,
    // $scope.errorMessage = 'Form must be valid';
  }
})();