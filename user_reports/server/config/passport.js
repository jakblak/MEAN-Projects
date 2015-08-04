var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.getUserByUsername(username, function(err, user) {
        if (err) throw err;
        if (!user) {
          console.log('Unknown User');
          return done(null, false, {
            message: 'Unknown User'
          });
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            console.log('Invalid Password');
            return done(null, false, {
              message: 'Invalid Password'
            });
          }
        });
      });
    }));

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });
}