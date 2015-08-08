var express = require('express');
var report = require('../controllers/report.controller');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.route('/add')
  .post(report.create);

module.exports = router;
