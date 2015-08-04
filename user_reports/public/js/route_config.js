(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

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
        controller: 'AddCtrl'
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

})();