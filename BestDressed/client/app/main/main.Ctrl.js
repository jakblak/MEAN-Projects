// Upload or add URL - reformat image + save to DB
// Admin form for uploads, title/description, links
// Display images using ngGrid
// Sort by 'my uploads' or 'community'

(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'Auth', '$state', '$modal', '$alert', '$timeout', '$http', 'looksAPI', 'Upload'];

  function MainCtrl($scope, Auth, $state, $modal, $alert, $timeout, $http, looksAPI, Upload) {

    if (!Auth.isLoggedIn()) {
      $state.go('login');
    }

    $scope.showForm = false;
    $scope.loading = false;
    $scope.look = {};
    $scope.uploadLookForm = true;
    $scope.gotScrapeResults = false;
    $scope.userEmail = Auth.getUserEmail();

    var alert = $alert({
      title: 'Saved ',
      content: 'New Look added',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var myModal = $modal({
      scope: $scope,
      // templateUrl: 'app/main/addLookModal_UploadTest.html',
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

    // Watch for changes to URL, Scrape & Display the image (get 4 img let user select)
    $scope.$watch("look.link", function(newVal, oldVal) {
      console.log('newVal: ', newVal, ' oldVal: ', oldVal);
      if (newVal.length > 5) {
        $scope.loading = true;
        $http.post('/api/links/scrape', {
          url: $scope.look.link
        })
          .then(function(data) {
            // Set loading gif to true
            console.log(data);
            $scope.showForm = true;
            $scope.look.imgThumb = data.data.img;
            $scope.look.description = data.data.desc;
          }, function(error) {
            console.log('failed to return from scrape');
            $scope.loading = false;
          })
          .finally(function() {
            $scope.loading = false;
            $scope.uploadLookForm = false;
            $scope.gotScrapeResults = true;
          });
      }
    });

    $scope.addPost = function() {
      // Send post details to DB
      var look = {
        description: $scope.look.description,
        title: $scope.look.title,
        image: $scope.look.imgThumb,
        linkURL: $scope.look.link,
        email: $scope.userEmail
      }

      looksAPI.createLook(look)
        .success(function(data) {
          console.log('posted from frontend success');
          $scope.showForm = false;
          $scope.look.title = '';
          $scope.look.link = '';
          alert.show();
        })
        .error(function() {
          console.log('failed to post from frontend');
          $scope.showForm = false;
          $alert({
            title: 'Not Saved ',
            content: 'New Look failed to save',
            placement: 'top-right',
            container: '#alertContainer',
            type: 'warning',
            duration: 8
          });
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
          'title': $scope.look.title
        }
      }).then(function(resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function(resp) {
        console.log('Error status: ' + resp.status);
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };


      $scope.requestTest = function() {
      // Send post details to DB
      var look = {
        title: $scope.look.title,
        image: $scope.look.imgThumb
      }

      return $http.post('api/look/request', look)
        .success(function(data) {
          console.log('posted from frontend success');
          $scope.showForm = false;
          $scope.look.title = '';
          $scope.look.link = '';
          alert.show();
        })
        .error(function() {
          console.log('failed to post from frontend');
          $scope.showForm = false;
          $alert({
            title: 'Not Saved ',
            content: 'New Look failed to save',
            placement: 'top-right',
            container: '#alertContainer',
            type: 'warning',
            duration: 8
          });
        });
    }

    // $scope.uploadPic = function(file) {

    //   file.upload = Upload.upload({
    //     url: 'api/look/upload',
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     fields: {
    //       description: $scope.look.description,
    //       title: $scope.look.title,
    //       image: $scope.look.imgThumb,
    //       linkURL: $scope.look.link,
    //       email: $scope.userEmail
    //     },
    //     file: file
    //   });

    //   file.upload.then(function(response) {
    //     $timeout(function() {
    //       file.result = response.data;
    //     });
    //   }, function(response) {
    //     if (response.status > 0)
    //       $scope.errorMsg = response.status + ': ' + response.data;
    //   });

    //   file.upload.progress(function(evt) {
    //     // Math.min is to fix IE which reports 200% sometimes
    //     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    //   });
    // };
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