(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('look', {
        url: '/look/:lookId',
        templateUrl: 'app/look/look_detail_view.html',
        controller: 'LookCtrl'
      });
  }

})();