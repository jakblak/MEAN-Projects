(function() {
  'use strict';

  angular
    .module('app')
    .directive('disableAnimate', disableAnimate);

    disableAnimate.$inject = ['$animate'];

    function disableAnimate($animate) {
      return function (scope, element) {
        $animate.enabled(element, false);
      }
    };

})();