(function() {
  'use strict';

  angular
    .module('app')
    .controller('AddCtrl', AddCtrl);

    AddCtrl.$inject = ['Auth'];

    function AddCtrl(Auth){
      console.log(Auth.getUserStatus());
    }
})();