'use strict';

angular
  .module('app')
  .controller('countryCtrl', countryCtrl);

countryCtrl.$inject = ['$scope', 'geonames'];

function countryCtrl($scope, geonames) {
  // get individual country
  geonames.getCountry()
    .then(function(result) {
      $scope.country = result.geonames[0];
    });

  // get neighboring countries
  geonames.getNeighborList()
    .then(function(result) {
      $scope.neighbors = result.geonames;
    });

  // get capitails
  geonames.getCapitalDetails()
    .then(function(result) {
      $scope.capitalPopulation = result.geonames[0].population;
    });
};