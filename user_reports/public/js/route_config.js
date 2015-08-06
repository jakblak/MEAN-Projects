(function() {
  'use strict';

  angular
    .module('app')
    .config(config)
    .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  run.$inject = ['$rootScope', '$state', 'Auth', '$alert'];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .state('login', {
        url: '/login.html',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register.html',
        templateUrl: 'partials/register.html',
        controller: 'RegisterCtrl'
      })
      .state('addReport', {
        url: '/add.html',
        templateUrl: 'partials/add.html',
        controller: 'AddCtrl',
        restricted: true
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

  function run($rootScope, $state, Auth, $alert) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.restricted && Auth.isLoggedIn() === false) {
        $state.go('login');
        $alert({
            title: 'Log In ',
            content: 'You must Log In to access this page',
            placement: 'top-right',
            //container: '#alertContainer',
            type: 'success',
            duration: 8
          });
        event.preventDefault();
      }
    });
  }

})();