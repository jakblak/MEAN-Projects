'use strict';

var errors = require('./components/errors');
var auth = require('./auth/auth.service');

module.exports = function(app) {

  // Insert routes below
  app.use('/auth', require('./auth'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/look', require('./api/look'));
  app.use('/api/links', require('./api/imgLinks'));
  app.use('/api/comments', require('./api/comments'));

  app.post('/forgotpassword', require('./forgotpassword').reset);

  app.use('/main', function(req, res, next){
    if (auth.isAuthenticated() !== true){
      res.redirect('/login')
    }
    else {
      next();
    }
  });

  // All undefined asset or api routes should return a 404
 //  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
 //   .get(errors[404]);
 // };

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};