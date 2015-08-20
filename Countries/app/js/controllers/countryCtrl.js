(function() {
  'use strict';

  angular
    .module('app')
    .controller('CountryCtrl', CountryCtrl);

  CountryCtrl.$inject = ['$scope', 'geonames'];

  function CountryCtrl($scope, geonames) {
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

})();