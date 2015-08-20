(function() {
  'use strict';

  angular
    .module('app')
    .controller('AllCountriesCtrl', AllCountriesCtrl);

  AllCountriesCtrl.$inject = ['$scope', 'geonames'];

  function AllCountriesCtrl($scope, geonames) {
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

})();