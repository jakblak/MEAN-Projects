var fs = require('fs');
var request = require('request');

exports.downloadURI = function(url, filename, callback) {

    request(url)
      .pipe(fs.createWriteStream(filename))
      .on('close', function() {
        callback(filename);
        console.log(filename);
        //callback(filename));
    });
  };
  //   });
  // };
  // scrape(url, '../client/assets/images/' + randomizer + '.png', function(filename) {
  //   console.log('done');