(function() {
  'use strict';

  angular
    .module('app')
    .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['$scope', 'Auth', '$location', '$window'];

    function SignupCtrl($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    if (Auth.isLoggedIn()){
      $location.path('/main');
    }

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          gravatar: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          $location.path('/main');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
})();