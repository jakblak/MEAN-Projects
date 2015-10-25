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

    $scope.look = [];
    $scope.picPreview = true;
    $scope.scrapePostForm = true;
    $scope.uploadLookTitle = true;
    $scope.uploadLookForm = false;
    $scope.showScrapeDetails = false;
    $scope.loading = false;
    $scope.gotScrapeResults = false;
    $scope.user = Auth.getCurrentUser();

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

    looksAPI.getAllLooks()
      .then(function(data) {
        console.log(data);
        $scope.looks = data;
      });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }

    $scope.showUploadForm = function() {
      $scope.uploadLookForm = true;
      $scope.scrapePostForm = false;
      $scope.uploadLookTitle = false;
    }

    $scope.addVote = function(look) {

      looksAPI.upVoteLook(look)
        .then(function(data) {
          console.log(data);
          look.upVotes++;
        })
        .catch(function(err) {
          console.log('failure adding like');
        });
    }

    // Watch for changes to URL, Scrape & Display the image
    $scope.$watch("look.link", function(newVal, oldVal) {
      // console.log('newVal: ', newVal, ' oldVal: ', oldVal);
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
        email: $scope.user.email,
        name: $scope.user.name,
        _creator: $scope.user._id
      }

      looksAPI.createScrapeLook(look)
        .success(function(data) {
          console.log('posted from frontend success');
          $scope.showScrapeDetails = false;
          $scope.gotScrapeResults = false;
          $scope.look.title = '';
          $scope.look.link = '';
          $scope.looks.splice(0, 0, data);
          $state.go('main');
          // alertSuccess.show();
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
          title: $scope.look.title,
          description: $scope.look.description,
          email: $scope.user.email,
          name: $scope.user.name,
          linkURL: $scope.look._id,
          _creator: $scope.user._id
        }
      }).then(function(resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        $scope.looks.push(0, 0, resp.data);
        $scope.look.title = '';
        $scope.look.description = '';
        $scope.picPreview = false;
        alertSuccess.show();
      }, function(resp) {
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }

    // $scope.pageChanged = function() {
    //   $scope.refresh();
    // }

    // $scope.refresh = function() {
    //   $timeout(function() {
    //           angularGridInstance.gallery.refresh();
    //           console.log('update with timeout fired ');
    //         }, 2000);
    // }

  }
})();