var express = require('express');
var controller = require('../controllers/index.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/test', controller.test);

module.exports = router;
