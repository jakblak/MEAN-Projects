var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function() {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({
        username: username
      }).exec(function(err, user) {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
    }));

  passport.serializeUser(function(user, done) {
    if (user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }).exec(function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  })

}