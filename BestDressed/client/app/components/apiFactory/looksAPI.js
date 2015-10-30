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
      upVoteLook: upVoteLook,
      addView: addView
    });

    function createScrapeLook(post) {
      return $http.post('/api/look/scrapeUpload', post);
    }

    // GET all Looks
    function getAllLooks() {
      var url = '/api/look/getAllLooksTest';
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

    function findOneLook(look) {
      var url = '/api/look/' + look;
      var request = $http.get(url, {
        cache: true
      });
      return (request.then(handleSuccess, handleError));
    }

    function popLooks(look) {
      var url = '/api/look/popLooks/' + look;
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

    function deleteLook(look) {
      return $http.delete('/api/look/' + look._id);
    }

    function upVoteLook(look, pass) {
      return $http.put('/api/look/upvote/' + look._id, pass);
    }

    function addView(look) {
      return $http.put('/api/look/view/' + look);
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