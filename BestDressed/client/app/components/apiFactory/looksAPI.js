(function() {
  'use strict';

  angular
    .module('app')
    .factory('looksAPI', looksAPI);

  looksAPI.$inject = ['$http'];

  function looksAPI($http) {
    return ({
      getAllLooks: getAllLooks,
      getUserLooks: getUserLooks,
      findOneLook: findOneLook,
      createLook: createLook,
      deleteLook: deleteLook
    });

    // GET all Looks
    function getAllLooks() {
      var url = 'api/look/getAllLooks';
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

    function createLook(post) {
      return $http.post('/api/look', post);
    }

    function deleteLook(Look) {
      return $http.delete('/api/look/' + Look._id);
    }

    function findOneLook(Look) {
      var url = '/api/look/' + $route.current.params.id;
      var request = $http.get(url);
      return (request.then(handleSuccess, handleError));
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