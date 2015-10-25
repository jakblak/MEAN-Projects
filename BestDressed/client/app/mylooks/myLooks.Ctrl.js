(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyLooksCtrl', MyLooksCtrl);

  MyLooksCtrl.$inject = ['$scope', '$modal', '$state', '$alert', 'looksAPI', 'Auth', '$location'];

  function MyLooksCtrl($scope, $modal, $state, $alert, looksAPI, Auth, $location) {

    if (!Auth.isLoggedIn()) {
      $state.go('login');
    }

    $scope.user = Auth.getCurrentUser();
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

    $scope.noLooks = function() {
      $scope.userLooks.length === 0;
    }

    // Get all User Looks
    looksAPI.getUserLooks($scope.user.email)
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
          console.log(data);
          $scope.editLook.title = '';
          $scope.editLook.description = '';
          alertSuccess.show();
        })
        .catch(function(err) {
          console.log('failed', err);
          alertFail.show();
        })
        .finally(function() {
          $scope.getUserLooks();
          $location.path('/mylooks');
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


// $scope.userLooks[look] = data.data;
// newLooks.splice(look, 1);
// newLooks.splice(look, 0, data);

// newLooks.splice($index, 1, data)
// $scope.updateObjectInArray(newLooks, look, data);
// alertSuccess.show();

// looksAPI.getUserLooks($scope.user.email)
//   .then(function(data) {
//     $scope.userLooks = data;
//   })
// $location.path('/mylooks');
// angular.forEach($scope.userLooks, function(u, i) {
//   if (u._id === look._id) {
//     $scope.userLooks[i] = data.data;
//   }
// })

// $scope.updateObjectInArray = function (array, object, newData) {
//     for(i in array) {
//         if(array[i]._id === object._id) {
//             if(newData != undefined) {
//                 angular.extend(array[i], newData)
//             } else {
//                 return array[i];
//             }
//         }
//     }
//     return undefined;
// }