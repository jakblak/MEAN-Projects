(function() {
  'use strict';

  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['Auth'];

    function HomeCtrl(Auth){
      console.log(Auth.getUserStatus());
    }
})();