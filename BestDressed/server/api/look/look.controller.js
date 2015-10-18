// Get Newest, Popular (upvotes), Category  -  use limit

'use strict';

var _ = require('lodash');
var Look = require('./look.model');
var path = require('path');
var express = require('express');

var utils = require('./utils.js');

// Scrape Pin Data + Save to DB
exports.scrapeUpload = function(req, res) {
  var random = utils.randomizer(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  utils.downloadURI(req.body.image, '../client/assets/images/uploads/' + random + '.png', function(filename) {
    console.log('done');

    var newLook = new Look();
    newLook.title = req.body.title;
    newLook.image = filename.slice(9);
    newLook.email = req.body.email;
    newLook.linkURL = req.body.linkURL;
    newLook.title = req.body.title;
    newLook.description = req.body.description;
    newLook.createTime = Date.now();
    newLook.createDate = new Date();
    newLook.upVotes = 0;
    newLook.save(function(err, item) {
      if (err) {
        console.log('error occured in saving post');
      } else {
        console.log('Success post saved');
        console.log(item);
        res.status(200)
          .json(item);
      }
    });
  });
}

exports.create = function(req, res) {
  var newLook = new Look();
  newLook.image = req.body.image;
  newLook.email = req.body.email;
  newLook.linkURL = req.body.linkURL;
  newLook.title = req.body.title;
  newLook.description = req.body.description;
  newLook.createTime = Date.now();
  newLook.createDate = new Date();
  newLook.upVotes = 0;

  newLook.save(function(err, item) {
    if (err) {
      console.log('error occured in saving post');
      return res.send(500);
    } else {
      console.log('Success post saved');
      console.log(item);
      res.status(200)
        .send(item);
    }
  });
};

exports.upload = function(req, res) {
  var newLook = new Look();
  var fileimage = req.middlewareStorage.fileimage;

  console.log(req.body);
  newLook.image = '/assets/images/uploads/' + fileimage;
  newLook.email = req.body.email;
  newLook.linkURL = req.body.linkURL;
  newLook.title = req.body.title;
  newLook.description = req.body.description;
  newLook.createTime = Date.now();
  newLook.createDate = new Date();
  newLook.upVotes = 0;

  newLook.save(function(err, look) {
    if (err) {
      console.log('error saving look ');
      return res.send(500);
    } else {
      console.log(look);
      console.log('Look Saved to DB ');
      res.status(200)
        .send(look);
    }
  });
};

// Get all looks for User
exports.userLooks = function(req, res) {
  Look.find({
    email: {
      $in: req.query.email
    }
  }, function(err, looks) {
    if (err) {
      return handleError(res, err);
    }
    console.log(looks);
    return res.status(200)
      .json(looks);
  });
};

exports.allLooks = function(req, res) {
  Look.find(function(err, looks) {
    if (err) {
      return handleError(res, err);
    }
    if (!looks) {
      return res.send(404);
    }
    console.log(looks);
    return res.status(200)
      .json(looks);
  });
};

// Get a single look
exports.singleLook = function(req, res) {
  Look.findById(req.params.lookId, function(err, look) {
    if (err) {
      return handleError(res, err);
    }
    if (!look) {
      return res.send(404);
    }
    return res.json(look);
  });
};

// Updates an existing look in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Look.findById(req.params.id, function(err, look) {
    if (err) {
      return handleError(res, err);
    }
    if (!look) {
      return res.send(404);
    }
    var updated = _.merge(look, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200)
        .json(look);
    });
  });
};

// updates upVote count when somebody upVotes an item
exports.addUpvote = function(req, res) {
  Look.findById(req.params.id, function(err, look) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    look.upVotes++;
    look.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, look);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Look.findById(req.params.id, function(err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    thing.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}