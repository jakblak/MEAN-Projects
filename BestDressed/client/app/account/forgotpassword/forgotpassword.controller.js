'use strict';

angular.module('app')
  .controller('ForgotPasswordCtrl', function ($scope, $http) {
    $scope.errors = {};

    $scope.reset = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        $http.post('http://localhost:9000/forgotpassword/?email=' + $scope.user.email)
        .then( function() {
          $scope.message = 'An email with your new password has been sent to your email address.';
        });
        // .catch( function() {
        //   form.password.$setValidity('mongoose', false);
        //   $scope.errors.other = 'Incorrect password';
        //   $scope.message = '';
        // });
      }
		};
  });