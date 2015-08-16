(function() {
  'use strict';

  angular
    .module('app')
    .controller('TestCtrl', TestCtrl);

    TestCtrl.$inject = ['$scope'];

    function TestCtrl ($scope) {
      $scope.loading = true;
    }

})();