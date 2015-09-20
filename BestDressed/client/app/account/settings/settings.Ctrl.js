(function() {
  'use strict';

  angular
    .module('app')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['$scope', 'User', 'Auth', '$http'];

  function SettingsCtrl($scope, User, Auth, $http) {

    // Watch for changes to URL, Scrape & Display the image (get 4 img let user select)
    $scope.$watch("link", function(newVal, oldVal) {
      console.log('newVal:', newVal, ' oldVal: ', oldVal);
      if (newVal.length > 5) {
        $http.post('/api/links/scrape', {
          url: $scope.link
        })
        //console.log(newVal);
        .success(function(data) {

          console.log('returned from scrape: ', data);
          $scope.details.img = data.img;
          $scope.details.url = data.url;
          $scope.details.description = data.desc;
        })
          .error(function() {
            console.log('failed to scrape on frontend');
          });
      }
    });

    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function() {
            $scope.message = 'Password successfully changed.';
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    }

  }
})();