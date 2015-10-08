(function() {
  'use strict';

  angular
    .module('app')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['$scope', 'User', 'Auth', '$http', '$alert'];

  function SettingsCtrl($scope, User, Auth, $http, $alert) {
    $scope.user = Auth.getCurrentUser();
    $scope.showForm = false;
    $scope.loading = false;

    // Watch for changes to URL, Scrape & Display the image (get 4 img let user select)
    $scope.$watch("look.link", function(newVal, oldVal) {
      console.log('newVal: ', newVal, ' oldVal: ', oldVal);
      if (newVal.length > 5) {
        $scope.loading = true;
        $http.post('/api/links/scrape', {
          url: $scope.look.link
        })
        .then(function(data) {
          // Set loading gif to true
          console.log(data);
          $scope.showForm = true;
          //$scope.linkOut = data.data.url;
          $scope.look.imgThumb = data.data.img;
          $scope.look.description = data.data.desc;
        }, function(error) {
          console.log('failed to return from scrape');
          $scope.loading = false;
        })
        .finally(function(){
          $scope.loading = false;
        });
      }
    });

    $scope.addPost = function() {
      // Send post details to DB
      var item = $scope.look;

      return $http.post('/api/look', item)
        .success(function(data) {
          console.log('posted from frontend success');
          $scope.showForm = false;
          $scope.look.title = '';
          $scope.look.link = '';
          $alert({
            title: 'Saved ',
            content: 'New Look added',
            placement: 'top-right',
            container: '#alertContainer',
            type: 'success',
            duration: 8
          });
        })
        .error(function() {
          console.log('failed to post from frontend');
          $scope.showForm = false;
          $alert({
            title: 'Not Saved ',
            content: 'New Look failed to save',
            placement: 'top-right',
            container: '#alertContainer',
            type: 'warning',
            duration: 8
          });
        });
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