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
        });
        // .error(function() {
        //   console.log('failed to fetch look ');
        // });

    }
})();