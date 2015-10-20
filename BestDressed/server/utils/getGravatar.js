var gravatar = require('gravatar');

exports.grab = function(url) {

  gravatar.url(url, {
    s: 50,
    d: 'retro'
  });
}