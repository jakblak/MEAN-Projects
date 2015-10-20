(function() {
  'use strict';

  angular
    .module('app')
    .controller('LookCtrl', LookCtrl);

    LookCtrl.$inject = ['$scope', '$stateParams', 'looksAPI'];

    function LookCtrl($scope, $stateParams, looksAPI){

      // var id = $stateParams.lookId;
      $scope.id = $stateParams.lookId;

      looksAPI.findOneLook()
        .then(function(data) {
          console.log(data);
          $scope.look = data;
        }, function(err) {
          console.log('failed to get look ', err);
        });

    }
})();