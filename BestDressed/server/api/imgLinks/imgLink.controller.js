'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var scrapers = {};
scrapers['pinterest'] = require('./scrapers/pinterest.scraper');

exports.scrape = function(req, res) {
  var url = req.body.url,
    scraperToUse;

  if (url.indexOf("pinterest") > -1) {
    scraperToUse = 'pinterest';
  } else {
    console.log('cannot locate scraper');
  }

  scrapers[scraperToUse].list(url, function(data) {
    // console.log('data from scraper: ', data);
    res.json(data);
  });

}