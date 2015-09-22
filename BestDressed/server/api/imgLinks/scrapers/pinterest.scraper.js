'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, cb) {

  // this is the actual request to the pinterest page I care about
  request(url, function(error, resp, body) {
    console.log(url);

    if (error) {
      cb({
        error: error
      });
    }

    if (!error) {
      // get ready for scraping
      var $ = cheerio.load(body);
      var pin = {};
      var $url = url;
      var img = $("meta[itemprop = 'image']").get(1);
      var $img = $(img).attr('content');
      var $desc = $("meta[itemprop = 'text']").attr('content');

      console.log($img + ' pin url');

      // Finding the bits on the page we care about based on class names
        var pin = {
          img: $img,
          url: $url,
          desc: $desc
        }

      // respond with the final json
      console.log("scraped: ", pin);
      cb(pin);
    }
  });
}