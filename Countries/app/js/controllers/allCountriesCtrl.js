'use strict';

angular
  .module('app')
  .controller('allCountriesCtrl', allCountriesCtrl);

allCountriesCtrl.$inject = ['$scope', 'geonames'];

function allCountriesCtrl($scope, geonames) {
  $scope.sortType = 'countryName';
  $scope.sortReverse = false;
  $scope.searchCountries = '';

  // get all countries
  geonames.getCountryList()
    .then(function(result) {
      //append the DOM
      $scope.countries = result.geonames;
    });
  }