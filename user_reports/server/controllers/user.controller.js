var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
      password: password
    });

  User.createUser(newUser, function(err, user) {
    if (err) throw err;
    console.log(user);
  });

  // Success Message
  //req.flash('success', 'You are now registered and may log in');

  res.location('/');
  res.redirect('/');
}