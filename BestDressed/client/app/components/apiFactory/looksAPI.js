(function() {
  'use strict';

  angular
    .module('app')
    .factory('looksAPI', looksAPI);

  looksAPI.$inject = ['$http', '$stateParams'];

  function looksAPI($http, $stateParams) {
    return ({
      createScrapeLook: createScrapeLook,
      getAllLooks: getAllLooks,
      getUserLooks: getUserLooks,
      findOneLook: findOneLook,
      popLooks: popLooks,
      getUpdateLook: getUpdateLook,
      updateLook: updateLook,
      deleteLook: deleteLook,
      upVoteLook: upVoteLook
    });

    function addComment(comment) {
      return $http.post('/api/comments', comment);
    }

    function createScrapeLook(post) {
      return $http.post('/api/look/scrapeUpload', post);
    }

    // GET all Looks
    function getAllLooks() {
      var url = '/api/look/getAllLooks';
      var request = $http.get(url, {
        cache: true
      });
      return (request.then(handleSuccess, handleError));
    }

    // GET only User's Looks
    function getUserLooks(id) {
      var url = '/api/look/getUserLooks/?email=' + id;
      var request = $http.get(url, {
        cache: true
      });
      return (request.then(handleSuccess, handleError));
    }

    function findOneLook() {
      var url = '/api/look/' + $stateParams.lookId;
      var request = $http.get(url, {
        cache: true
      });
      return (request.then(handleSuccess, handleError));
    }

    function popLooks(id) {
      var url = '/api/look/popLooks/' + id;
      var request = $http.get(url, {
        cache: true
      });
      return (request.then(handleSuccess, handleError));
    }

    function getUpdateLook(look) {
      return $http.get('api/look/' + look._id);
    }

    function updateLook(look) {
      return $http.put('api/look/' + look._id, look);
    }

    function upVoteLook(look) {
      return $http.put('/api/look/upvote/' + look._id);
    }

    function deleteLook(look) {
      return $http.delete('/api/look/' + look._id);
    }

    function handleError(response) {
      throw (response.data.message);
    }

    // handle success
    function handleSuccess(response) {
      return (response.data);
    }

    // $resource Example
    // function getUserLooks(id) {
    //   var url = '/api/look/getUserLooks/?email=' + id;
    //   var request = $resource(url, {
    //     cache: true
    //   });
    //   return request;
    // }
  }
})();