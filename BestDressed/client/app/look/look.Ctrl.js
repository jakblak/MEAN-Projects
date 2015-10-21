(function() {
  'use strict';

  angular
    .module('app')
    .controller('LookCtrl', LookCtrl);

  LookCtrl.$inject = ['$scope', '$stateParams', 'looksAPI', 'commentAPI', 'Auth'];

  function LookCtrl($scope, $stateParams, looksAPI, commentAPI, Auth) {

    $scope.user = Auth.getCurrentUser();

    $scope.id = $stateParams.lookId;

    looksAPI.findOneLook()
      .then(function(data) {
        console.log(data);
        $scope.look = data;
      }, function(err) {
        console.log('failed to get look ', err);
      });

    commentAPI.getComments($scope.id)
      .then(function(data) {
        console.log(data);
        $scope.comments = data;
      }, function(err) {
        console.log('failed to get comments ', err);
      });

    // Post new comment
    $scope.postComment = function() {
      var comment = {
        authorId: $scope.user._id,
        authorName: $scope.user.name,
        authorEmail: $scope.user.email,
        gravatar: $scope.user.gravatar,
        comment: $scope.comment.body,
        lookId: $scope.id
      }
      commentAPI.addComment(comment)
        .then(function(data) {
          console.log(data);
          $scope.comment.body = '';
        }, function(err) {
          console.log('failed to post object ', err);
        });
    }

  }
})();