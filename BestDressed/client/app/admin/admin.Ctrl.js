(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', 'Auth', '$modal', '$alert', '$location', 'looksAPI', 'adminAPI', 'angularGridInstance'];

  function AdminCtrl($scope, Auth, $modal, $alert, $location, looksAPI, adminAPI, angularGridInstance) {

    if (!Auth.isLoggedIn()) {
      $state.go('login');
    }

    $scope.looks = [];
    $scope.editLook = {};

    var alertSuccess = $alert({
      title: 'Success ',
      content: 'Look has been edited ',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'Not Saved ',
      content: 'Look failed to be edited ',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    });

    var showModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }

    adminAPI.getUsers()
      .then(function(data) {
        $scope.users = data;
      })
      .catch(function(err) {
        console.log('error getting users ', err);
      });

    looksAPI.getAllLooks()
      .then(function(data) {
        console.log(data);
        $scope.looks = data;
      })
      .catch(function(err) {
        console.log('error getting looks ', err);
      });

    $scope.deleteUser = function() {
      adminAPI.deleteUser()
        .then(function(data) {
          console.log('deleted user');
        })
        .catch(function(err) {
          console.log('failed to delete user ', err);
        });
    }

    $scope.editLook = function(look) {
      looksAPI.getUpdateLook(look)
        .then(function(data) {
          console.log(data);
          $scope.editLook = data.data;
        })
        .catch(function(err) {
          console.log('failed to get look ', err);
        });
    }

    $scope.deleteBtn = true;

    $scope.saveLook = function() {
      var look = $scope.editLook;

      looksAPI.updateLook(look)
        .then(function(data) {
          console.log('Look updated!');
          console.log(data);
          $scope.editLook.title = '';
          $scope.editLook.description = '';
          $scope.looks.indexOf(look) = data;
          alertSuccess.show();
        })
        .catch(function(err) {
          console.log('failed', err);
          alertFail.show();
        })
        .finally(function() {
          $scope.getUserLooks();
          $location.path('/admin');
        });
    }

    $scope.deleteLook = function(look) {
      looksAPI.deleteLook(look)
        .success(function(data) {
          var index = $scope.looks.indexOf(look);
          $scope.editLook.description = '';
          $scope.editLook.title = '';
          $scope.deleteBtn = false;
          alertSuccess.show();
          $scope.looks.splice(index, 1);
          console.log('success, Look deleted ');
        })
        .error(function(err) {
          alertFail.show();
          console.log('Error: ', err);
        });
    }

  }
})();