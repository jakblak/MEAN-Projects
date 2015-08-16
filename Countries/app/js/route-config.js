(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/views/home.html",
        controller: "HomeCtrl"
      })
      .state("countries", {
        url: "/countries",
        templateUrl: "/views/allCountries.html",
        controller: "allCountriesCtrl"
      })
      .state("countries.countryCode", {
        url: "/countries/:countryCode"
        templateUrl: "/views/country.html",
        controller: 'countryCtrl'
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  };

})();