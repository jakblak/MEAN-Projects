var passport = require('passport');
var User = require('../models/User.model');

exports.register = function(req, res, next) {
  // Get Form Values
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  var newUser = new User({
    email: email,
    username: username,
    password: password,
    password2: password2
  });

  User.createUser(newUser, function(err, user) {
    if (err) throw err;
    console.log(user);
    res.status(200).end();
  });
}

exports.login = function(req, res, next) {
  var auth = passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.send({
        success: false
      })
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send({
        success: true,
        user: user
      });
    })
  })
  auth(req, res, next);
}