(function() {
  'use strict';

  angular
    .module('app')
    .factory('Reports', Reports);

    Reports.$inject = ['$http'];

    function Reports($http){

      return {
        getReports: getReports,
        postReport: postReport
      }

      function getReports(){

      }

      function postReport(){
        return $http.post('/reports/add', report);
      }


    }
})();