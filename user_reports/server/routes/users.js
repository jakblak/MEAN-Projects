var express = require('express');
var users = require('../controllers/user.controller');
var router = express.Router();

/* GET users listing. */
// router.route('/login')
//   .post()
//   .get('/', function(req, res) {
//   res.send('respond with a resource');
// });

router.route('/register')
  .post(users.register);

module.exports = router;
