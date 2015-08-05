var express = require('express');
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

  // Success Message
  //req.flash('success', 'You are now registered and may log in');
    // res.location('/');
    // res.redirect('/register.html');
}