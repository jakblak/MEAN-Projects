(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject ['$scope'];

    function AdminCtrl($scope) {

      // Show users and their looks - option to Edit/Delete either
      adminAPI.getUsers()
        .then(function() {

        })
        .catch(function(err) {
          console.log('error in retrieving usrs', err);
        });

    }
})();