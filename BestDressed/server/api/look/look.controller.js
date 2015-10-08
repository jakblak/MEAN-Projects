'use strict';

var _ = require('lodash');
var Look = require('./look.model');
var path = require('path');

exports.create = function(req, res) {

  var newLook = new Look();
  newLook.image = req.body.imgThumb;
  // mediaType: req.body.mediaType;          // option for video
  // newLook.email = req.user.name;          // link to email/ID of user
  newLook.linkURL = req.body.link;
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

// Get list of things
exports.index = function(req, res) {
  Look.find({
    email: req.query.email
  }, function(err, things) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Look.findById(req.params.id, function(err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    return res.json(thing);
  });
};


// updates upVote count when somebody upVotes an item
exports.update = function(req, res) {
  Look.findById(req.params.id, function(err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    thing.upVotes++;
    thing.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, thing);
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