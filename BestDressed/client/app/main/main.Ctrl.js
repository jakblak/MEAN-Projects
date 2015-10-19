// Sort by 'my uploads' or 'community'

(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'Auth', '$location', '$modal', '$alert', '$timeout', '$http', 'looksAPI', 'Upload'];

  function MainCtrl($scope, Auth, $location, $modal, $alert, $timeout, $http, looksAPI, Upload) {

    if (!Auth.isLoggedIn()) {
      $location.path('/login');
    }

    $scope.look = {};
    $scope.picPreview = true;
    $scope.scrapePostForm = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
    $scope.showScrapeDetails = false;
    $scope.loading = false;
    $scope.gotScrapeResults = false;
    $scope.userEmail = Auth.getUserEmail();

    var alertSuccess = $alert({
      title: 'Saved ',
      content: 'New Look added',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'Not Saved ',
      content: 'New Look failed to save',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    });

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }

    // Get all Looks
    looksAPI.getAllLooks()
      .then(function(data) {
        console.log(data);
        $scope.looks = data;
      });

    $scope.showUploadForm = function() {
      $scope.uploadLookForm = true;
      $scope.scrapePostForm = false;
    }

    // Watch for changes to URL, Scrape & Display the image
    $scope.$watch("look.link", function(newVal, oldVal) {
      console.log('newVal: ', newVal, ' oldVal: ', oldVal);
      if (newVal.length > 5) {
        $scope.loading = true;
        $http.post('/api/links/scrape', {
          url: $scope.look.link
        })
          .then(function(data) {
            console.log(data);
            $scope.showScrapeDetails = true;
            $scope.gotScrapeResults = true;
            $scope.uploadLookTitle = false;
            $scope.look.imgThumb = data.data.img;
            $scope.look.description = data.data.desc;
          }, function(error) {
            console.log('failed to return from scrape');
            $scope.loading = false;
            $scope.look.link = '';
            $scope.gotScrapeResults = false;
          })
          .finally(function() {
            $scope.loading = false;
            $scope.uploadLookForm = false;
          });
      }
    });

    $scope.addScrapePost = function() {
      // Send post details to DB
      var look = {
        description: $scope.look.description,
        title: $scope.look.title,
        image: $scope.look.imgThumb,
        linkURL: $scope.look.link,
        email: $scope.userEmail
      }

      looksAPI.createScrapeLook(look)
        .success(function(data) {
          console.log('posted from frontend success');
          // $scope.showScrapeDetails = false;
          // $scope.gotScrapeResults = false;
          $scope.look.title = '';
          $scope.look.link = '';
          $scope.looks.push(data);
          alertSuccess.show();
          $hide();
        })
        .error(function() {
          console.log('failed to post from frontend');
          $scope.showScrapeDetails = false;
          alertFail.show();
        });
    }

    $scope.uploadPic = function(file) {
      Upload.upload({
        url: 'api/look/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file,
          'title': $scope.look.title,
          'description': $scope.look.description,
          'email': $scope.userEmail,
          'linkURL': $scope.look._id
        }
      }).then(function(resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        alertSuccess.show();
        $scope.looks.push(resp.data);
        $location.path('/main');
        $scope.look.title = '';
        $scope.look.description = '';
        $scope.picPreview = false;
      }, function(resp) {
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };

  }
})();

// 'use strict';

// angular.module('snapItApp')
//   .controller('MainCtrl', ['$scope', 'Auth', '$http', 'socket', function ($scope, Auth, $http, socket) {
//     // if (!Auth.isLoggedIn()){
//     //   $location.path('/login');
//     // }

//     $scope.awesomeThings = [];
//     $scope.pics = [];
//     $scope.searchTxt = '';
//     $scope.searchDate = true;
//     $scope.isRSSCollapsed = true;
//     $scope.isUploadCollapsed = true;
//     $scope.userEmail = Auth.getUserEmail();


//     $http.get('/api/things/getItems/?email='+ $scope.userEmail).success(function(pics) {
//       $scope.pics = pics;
//       socket.syncUpdates('thing', $scope.pics);
//       // $scope.pics.forEach(function(item){
//       //   item.mediaType = item.mediaType;
//       //   item.media = item.media;
//       //   item.url = item.url;
//       //   item.title = item.title;
//       //   item.description = item.description;
//       //   item.email = item.email;
//       //   item.createDate = item.createDate;

//       // });

//       //sort in ascending order
//       $scope.searchDate = false;
//       $scope.sortByTime();
//     });

//     $scope.showImage = function(mediaType) {
//       if (mediaType === 'image') {
//         return true;
//       }
//       return false;
//     };

//     $scope.isSelection = function(mediaType) {
//       if (mediaType === 'selection' || mediaType === 'rssFeed') {
//         return true;
//       }
//       return false;
//     };

//     $scope.isPage = function(mediaType) {
//       if (mediaType === 'page') {
//         return true;
//       }
//       return false;
//     };

//     $scope.isLink = function(mediaType) {
//       if (mediaType === 'links') {
//         return true;
//       }
//       return false;
//     };

//     $scope.isRssFeed = function(mediaType) {
//       if (mediaType === 'rssFeed') {
//         return true;
//       }
//       return false;
//     };

//     $scope.$watch('searchTxt',function(val){
//       if (val === '') {
//         $http.get('/api/things/getItems?email='+ $scope.userEmail).success(function(pics) {
//           $scope.pics = pics;
//           socket.syncUpdates('thing', $scope.pics);
//           $scope.pics.forEach(function(item){
//             item.mediaType = item.mediaType;
//             item.media = item.media;
//             item.url = item.url;
//             item.title = item.title;
//             item.description = item.description;
//             item.email = item.email;
//             item.createDate = item.createDate;

//           });

//           //sort in ascending order
//           $scope.searchDate = false;
//           $scope.sortByTime();
//         });
//       } else {
//         $scope.pics = $scope.pics.filter(function(obj){
//           return obj.title.toLowerCase().indexOf(val) !== -1;
//         });
//       }

//     });

//     $scope.sortByLikes = function(){
//       $scope.pics.sort(function(a,b){
//          return b.likes - a.likes;
//       });
//     };

//     $scope.sortByTime = function(){
//       if ($scope.searchDate) { //sort in recent first
//         $scope.pics.sort(function(a,b){
//           return a.createTime - b.createTime;
//         });
//       } else { // sort in ascending order
//         $scope.pics.sort(function(a,b){
//           return b.createTime - a.createTime;
//         });
//       }

//       $scope.searchDate = !$scope.searchDate;
//     };

//     $scope.deleteSnapit = function(thing) {
//       $http.delete('/api/things/' + thing._id);
//     };

//     $scope.upVote = function(thing) {
//       thing.upVotes++;
//       $http.patch('/api/things/' + thing._id);

//       //$scope.searchDate = !$scope.searchDate;
//       $scope.sortByTime();
//       $scope.sortByTime();
//     };

//   }]);