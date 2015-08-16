(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'templates/dashboard.html',
        controller: 'AlertsCtrl'
      })
      .state('tables', {
        url: '/tables',
        templateUrl: 'templates/tables.html',
        controller: 'TablesCtrl'
      })
      .state('test', {
        url: '/test',
        templateUrl: 'templates/test.html',
        controller: 'TestCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $authProvider.loginUrl = 'http://localhost:8888/login';
    $authProvider.signupUrl = 'http://localhost:8888/register';
    $authProvider.oauth2({
      name: 'instagram',
      url: 'http://localhost:8888/auth/instagram',
      redirectUri: 'http://localhost:8888',
      clientId: '8376426257d74c32bf9357e3ea1278a2',
      requiredUrlParams: ['scope'],
      scope: ['likes'],
      scopeDelimiter: '+',
      authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });
  }

})();