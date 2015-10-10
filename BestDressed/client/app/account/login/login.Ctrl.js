(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$location', '$window'];

  function LoginCtrl($scope, Auth, $location, $window) {
    if (Auth.isLoggedIn()) {
      $location.path('/main');
    }

    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function() {
            // Logged in, redirect to home
            $location.path('/main');
          })
          .catch(function(err) {
            $scope.errors.other = err.message;
          });
      }
    };


    // $scope.isActive = function(route) {
    //   return route === $location.path();
    //   // $location.path('/forgotpassword');
    // };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }

})();