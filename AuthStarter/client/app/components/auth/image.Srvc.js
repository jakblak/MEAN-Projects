'use strict';

angular.module('app')
  .factory('getPics', function imageService($location, $rootScope, $http) {
  // .factory('getPics', function imageService($location, $rootScope, $http, User, $cookieStore, $q) {
    // var currentUser = {};
    //.service('imageService',['$q','$http',function($q,$http){
    var pics = [];
  var url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK';
  $http.jsonp(url).success(
    function (data) {
      data.items.forEach(function (obj) {
        var desc = obj.description,
          width = desc.match(/width="(.*?)"/)[1],
          height = desc.match(/height="(.*?)"/)[1];

        obj.actualHeight = height;
        obj.actualWidth = width;
      });
      pics = data.items;
    });

  return { pics:pics};

  });

