(function() {
  'use strict';

  angular
    .module('app')
    .factory('commentAPI', commentAPI);

  commentAPI.$inject = ['$http', '$stateParams'];

  function commentAPI($http, $stateParams) {
    return ({
      addComment: addComment,
      getComments: getComments
    });

    function addComment(comment) {
      return $http.post('/api/comments', comment);
    }

    function getComments(id) {
      var url = '/api/comments/' + id;
      var request = $http.get(url, {
        cache: true
      });
      return (request.then(handleSuccess, handleError));
    }

    function handleError(response) {
      throw (response.data.message);
    }

    // handle success
    function handleSuccess(response) {
      return (response.data);
    }

  }
})();