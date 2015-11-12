(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('forgotpassword', {
        url: '/forgotpassword',
        templateUrl: 'app/account/forgotpassword/forgotpassword.html',
        controller: 'ForgotPasswordCtrl',
        authenticate: true
      });
    }
})();