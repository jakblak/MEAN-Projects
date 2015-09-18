'use strict';

var express = require('express');
var controller = require('./imgLink.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/scrape', auth.isAuthenticated(), controller.scrape);

module.exports = router;