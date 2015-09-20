'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.list = function (url, cb) {

  // this is the actual request to the pinterest page I care about
  request(url, function(err, resp, body){
    console.log(url);
    // get ready for scraping
    var $ = cheerio.load(body);
    var pins = [];
    var $pin;
    var $pins = $('.pin');

    var i = 0;

    // scraping only the 1st 10 pins;  you could get them all
    for (i; i < 10; ++i) {
      $pin = $pins.eq(i);

      // Finding the bits on the page we care about based on class names
      pins.push({
        img: $pin.find('.PinImageImg').attr('src'),
        url: 'http://pinterest.com' + $pin.find('.ImgLink').attr('href'),
        desc: $pin.find('.description').text()
      });
    }

    // respond with the final json
    console.log("scraped: ", pins);
    cb(pins);
  });
};