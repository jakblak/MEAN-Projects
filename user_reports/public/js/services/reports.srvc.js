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
        return $http.get('/reports/list');
      }

      function postReport(report){
        return $http.post('/reports/add', report);
      }

    }
})();