(function() {
  'use strict';

  angular
    .module('app')
    .factory('Auth', Auth);

    Auth.$inject = ['$http'];

    function Auth($http) {

      return {
        logIn: logIn
      }

      function logIn() {
        // Add logIn functionality here
      }

    }

})();