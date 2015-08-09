(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$http', 'Reports', 'Auth'];

    function HomeCtrl($scope, $http, Reports, Auth){
      console.log(Auth.getUserStatus());

      Reports.getReports()
        .success(function(result) {
          console.log(result);
          $scope.notes = result;
        });

      $scope.btnFilterNotes = function(){
        // filter by member name here
      }

    }
})();