(function() {
  'use strict';

  angular
    .module('app')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['$scope', 'User', 'Auth', '$http'];

  function SettingsCtrl($scope, User, Auth, $http) {
    $scope.errors = {};
    $scope.details = {};
    $scope.imgURL = false;
    $scope.loading = false;

    // Watch for changes to URL, Scrape & Display the image (get 4 img let user select)
    $scope.$watch("link", function(newVal, oldVal) {
      console.log('newVal: ', newVal, ' oldVal: ', oldVal);
      if (newVal.length > 5) {
        $scope.loading = true;
        $http.post('/api/links/scrape', {
          url: $scope.link
        })
        .then(function(data) {
          // Set loading gif to true
          console.log(data);
          $scope.imgURL = true;
          $scope.details.img = data.data.img;
          $scope.details.url = data.data.url;
          $scope.details.desc = data.data.desc;
          $scope.link = '';
        }, function(error) {
          console.log('failed to return from scrape');
          $scope.loading = false;
        })
        .finally(function(){
          // Set loading gif to false
          $scope.loading = false;
        });
      }
    });

    $scope.addPost = function() {
      // Send post details to DB
    }

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