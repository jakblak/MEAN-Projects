'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

// Test Gravatar generation
// var getGravatar = require('../../utils/getGravatar.js');
var gravatar = require('gravatar');

var validationError = function(res, err) {
  return res.json(422, err);
};


exports.create = function(req, res, next) {

  // var getG = getGravatar.grab(req.body.email);

  var getGravatar = gravatar.url(req.body.email, {
    s: 50,
    d: 'retro'
  });

  var newUser = new User(req.body);
  newUser.gravatar = getGravatar;
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err)
      return validationError(res, err);
    var token = jwt.sign({
      _id: user._id
    }, config.secrets.session, {
      expiresInMinutes: 60 * 5
    });
    res.json({
      token: token
    });
  });
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function(err, users) {
    if (err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
// exports.create = function(req, res, next) {
//   var newUser = new User(req.body);
//   newUser.provider = 'local';
//   newUser.role = 'user';
//   newUser.save(function(err, user) {
//     if (err) return validationError(res, err);
//     var token = jwt.sign({
//       _id: user._id
//     }, config.secrets.session, {
//       expiresInMinutes: 60 * 5
//     });
//     res.json({
//       token: token
//     });
//   });
// };

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function(err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function(err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

// reset a users password:

exports.resetPassword = function(email) {
  var chars = "abcdefghijklmnopqrstuvwxyz123456789"
  var newPass = ''

  for (var i = 0; i < 8; i++) {
    newPass += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  User.findOne({
    email: email
  }, function(err, user) {
    user.password = newPass;
    user.save(function(err) {
      if (err) {
        console.log("error saving password");
      }
    });
  });

  return newPass;
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Adds a url to the users database
 */
// exports.addUrl = function(req, res, next) {
//   var userEmail = req.body.email;

//    User.findOne({email:userEmail}, function (err, user) {
//       if (!user.rssUrls){
//         user.rssUrls = [];
//       }
//       user.rssUrls.push(req.body.url);
//       user.save(function(err) {
//         if (err) {
//           return validationError(res, err);
//         }
//         res.send(200);
//       });
//    });
// };


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};