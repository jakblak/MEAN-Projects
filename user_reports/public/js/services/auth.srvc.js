(function() {
  'use strict';

  angular
    .module('app')
    .factory('Auth', Auth);

  Auth.$inject = ['$http'];

  function Auth($http) {
    var loggedIn = false;

    return {
      register: register,
      login: login,
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus
    }

    function isLoggedIn() {
      if (loggedIn) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return loggedIn;
    }

    function register(user) {
      return $http.post('/users/register', user);
    }

    function login(user) {
      return $http.post('/users/login', user)
        .success(function(data) {
          loggedIn = true;
        })
        .error(function(data) {
          console.log('error occured');
          loggedIn = false;
        });
    }

  }
})();