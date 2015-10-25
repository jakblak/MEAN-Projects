(function() {
  'use strict';

  angular
    .module('app')
    .filter('paginate', paginate);

  paginate.$inject = [];

  function paginate() {
    return function(arr, currentPage, pageSize) {
      try {
        return arr.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      } catch (err) {
        return arr;
      }
    };
  }
})();