var express = require('express');
var users = require('../controllers/user.controller');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/register')
  .post(users.register);

router.route('/login')
  .post(users.login);

module.exports = router;
