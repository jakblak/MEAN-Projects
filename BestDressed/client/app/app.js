(function() {
  'use strict';

  angular
    .module('app', [
      'ngCookies',
      'ngSanitize',
      'ngResource',
      'ui.router',
      'ngAnimate',
      'ngFileUpload',
      'angularGrid',
      'angularMoment',
      'mgcrea.ngStrap'
    ])
    .config(config)
    .run(run)
    .factory('authInterceptor', authInterceptor);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];
  run.$inject = ['$rootScope', '$location', 'Auth'];
  authInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$location']

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }

  function run($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }

  function authInterceptor($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }

})();