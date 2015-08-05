(function() {
  'use strict';

  angular
    .module('app')
    .factory('Auth', Auth);

  Auth.$inject = ['$http'];

  function Auth($http) {
    return {
      register: register
    }

    function register(user) {
      return $http.post('/users/register', user);
    }

  }
})();