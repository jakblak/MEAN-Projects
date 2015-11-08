(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('mylooks', {
        url: '/mylooks/:id',
        templateUrl: 'app/mylooks/myLooks.html',
        controller: 'MyLooksCtrl',
        authenticate: true
      });
  }

})();