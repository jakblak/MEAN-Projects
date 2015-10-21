(function() {
  'use strict';

  angular
    .module('app')
    .controller('LookCtrl', LookCtrl);

  LookCtrl.$inject = ['$scope', '$stateParams', 'looksAPI', 'Auth'];

  function LookCtrl($scope, $stateParams, looksAPI, Auth) {

    $scope.user = Auth.getCurrentUser();

    $scope.id = $stateParams.lookId;

    looksAPI.findOneLook()
      .then(function(data) {
        console.log(data);
        $scope.look = data;
      }, function(err) {
        console.log('failed to get look ', err);
      });

    // Post new comment
    $scope.postComment = function() {
      var comment = {
        authorId: $scope.user._id,
        authorName: $scope.user.name,
        email: $scope.user.email,
        gravatar: $scope.user.gravatar,
        comment: $scope.comment.body
      }
      looksAPI.addComment(comment)
        .then(function(data) {
          console.log(data);
          $scope.comment.body = '';
        }, function(err) {
          console.log('failed to post object ', err);
        });
    }

  }
})();