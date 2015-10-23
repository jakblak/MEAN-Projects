(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyLooksCtrl', MyLooksCtrl);

  MyLooksCtrl.$inject = ['$scope', '$modal', '$state', '$alert', 'looksAPI', 'Auth'];

  function MyLooksCtrl($scope, $modal, $state, $alert, looksAPI, Auth) {

    if (!Auth.isLoggedIn()) {
      $state.go('login');
    }

    $scope.userEmail = Auth.getUserEmail();
    $scope.userLooks = [];
    $scope.editLook = {};

    var alertSuccess = $alert({
      title: 'Saved ',
      content: 'Look has been edited',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'Not Saved ',
      content: 'Look failed to edit',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    });

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }

    // Get all User Looks
    looksAPI.getUserLooks($scope.userEmail)
      .then(function(data) {
        console.log(data);
        $scope.userLooks = data;
      });

    $scope.editLook = function(look) {
      looksAPI.getUpdateLook(look)
      .then(function(data) {
        console.log(data);
        $scope.editLook = data.data;
      }, function(err) {
        console.log('failed to get look ', err);
      });
    }

    $scope.saveLook = function() {
      var look = $scope.editLook;

      looksAPI.updateLook(look)
        .then(function(data) {
          console.log('Look updated!');
          $scope.editLook.title = '';
          $scope.editLook.description = '';
          alertSuccess.show();
          $scope.userLooks.push(0, 0, data.data);
        }, function(err) {
          alertFail.show();
        });
    }

    $scope.delete = function(look) {
      var index = $scope.userLooks.indexOf(look);

      looksAPI.deleteLook(look)
        .success(function(data) {
          $scope.userLooks.splice(index, 1);
          console.log('success, Look deleted ');
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    }

  }
})();