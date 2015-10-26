(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject ['$scope', 'Auth', 'looksAPI', 'adminAPI'];

    function AdminCtrl($scope, Auth, looksAPI, adminAPI) {

      if (!Auth.isLoggedIn()) {
        $state.go('login');
      }

      adminAPI.getUsers()
        .then(function(data) {
          $scope.users = data;
        })
        .catch(function(err) {
          console.log('error getting users ', err);
        })

      looksAPI.getAllLooks()
      .then(function(data) {
        console.log(data);
        $scope.looks = data;
      })
      .catch(function(err) {
        console.log('error getting looks ', err);
      });


      // Show users and their looks - option to Edit/Delete either
      adminAPI.getUsers()
        .then(function() {

        })
        .catch(function(err) {
          console.log('error in retrieving usrs', err);
        });

    }
})();