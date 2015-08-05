(function() {
  'use strict';

  angular
    .module('app')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['$scope', 'Auth', '$state', '$alert'];

  function RegisterCtrl($scope, Auth, $state, $alert) {
    $scope.error = false;

    $scope.register = function(form) {

      var user = {
        username: $scope.username,
        password: $scope.password,
        password2: $scope.password2,
        email: $scope.email
      }

      Auth.register(user)
        .success(function() {
          console.log('User registered frontend');
          $state.go('login');
          $alert({
                title: 'Congratulations!',
                content: 'Your account has been created. ' + 'You may now login',
                placement: 'top-right',
                //container: '#alertContainer',
                type: 'success',
                duration: 8
              });
         })
        .error(function() {
          $scope.error = true;
          $scope.errorMessage = 'Something went wrong';
        })
    }

  }
})();