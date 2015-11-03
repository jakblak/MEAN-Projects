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
      'mgcrea.ngStrap',
      'infinite-scroll'
    ])
    .config(config)
    .run(run)
    .value('THROTTLE_MILLISECONDS', 1000)
    .factory('authInterceptor', authInterceptor);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];
  run.$inject = ['$rootScope', '$state', 'Auth'];
  authInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$location'];

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }

  function authInterceptor($rootScope, $q, $cookies, $injector) {
    var state;
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }

  function run($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate) {
        Auth.isLoggedIn(function(loggedIn) {
          if (!loggedIn) {
            event.preventDefault();
            $state.go('login');
          }
        });
      }
    });
  }

})();