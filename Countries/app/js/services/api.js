(function() {
  'use strict';

  angular
    .module('app')
    .factory('geonames', geonames);

  geonames.$inject = ['$http', '$stateParams', 'secrets'];

  function geonames($http, $stateParams, secrets) {
    return ({
      getCountryList: getCountryList,
      getCountry: getCountry,
      getNeighborList: getNeighborList,
      getCapitalDetails: getCapitalDetails,
      getWeather: getWeather
    });
    // all countries
    function getCountryList() {
      var url = "http://api.geonames.org/countryInfoJSON?username=" + secrets.user;
      var request = $http.get(url, {
        cache: true
      });
      return (request.then(handleSuccess, handleError));
    }
    // idividual countries
    function getCountry() {
      var url = "http://api.geonames.org/countryInfoJSON?username=" + secrets.user + "&country=" + $stateParams.countryCode;
      var request = $http.get(url);
      return (request.then(handleSuccess, handleError));
    }
    // neighbors
    function getNeighborList() {
      var url = "http://api.geonames.org/neighboursJSON?username=" + secrets.user + "&country=" + $stateParams.countryCode;
      var request = $http.get(url);
      return (request.then(handleSuccess, handleError));
    }
    // capital
    function getCapitalDetails() {
      var url = "http://api.geonames.org/searchJSON?formatted=true&username=" + secrets.user + "&q=capital&&style=full&country=" + $stateParams.countryCode;
      var request = $http.get(url);
      return (request.then(handleSuccess, handleError));
    }

    function getWeather() {
      var url = "http://api.openweathermap.org/data/2.5/weather?q=," + $stateParams.countryCode;
      return $http.jsonp(url, {
        params: {
          callback: 'JSON_CALLBACK',
          units: 'imperial'
        }
      })
      .then(function(response) {
        console.log('fetching data');
        return response.data;
      });
    }

    // handle the error
    function handleError(response) {
      // throw error
      throw (response.data.message);
    }

    // handle success
    function handleSuccess(response) {
      // return response
      return (response.data);
    }

  }
})();