(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$alert'];

  function LoginCtrl($scope, Auth, $state, $alert) {
    console.log(Auth.getUserStatus());
    $scope.error = false;

    $scope.login = function() {
      var user = {
        username: $scope.username,
        password: $scope.password
      }

      Auth.login(user)
        .success(function() {
          console.log('Log in successful');
          $state.go('home')
          $alert({
            title: 'Logged In ',
            content: 'You may now post new reports',
            placement: 'top-right',
            //container: '#alertContainer',
            type: 'success',
            duration: 8
          });
        })
        .error(function() {
          console.log('Error logging in');
          $scope.error = true;
          $scope.errorMessage = 'Something went wrong';
        });
    };
  }

})();