'use strict';

var controller = require('./look.controller');
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.post('/scrapeUpload', auth.isAuthenticated(), controller.scrapeUpload);
router.post('/upload', auth.isAuthenticated(), controller.upload);

router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/upvote/:id', auth.isAuthenticated(), controller.addUpvote);
router.put('/view/:id', auth.isAuthenticated(), controller.addView);

router.get('/getUserLooks', controller.userLooks);
router.get('/getAllLooks', controller.allLooks);

router.get('/:lookId', controller.singleLook);
router.get('/popLooks/:id', controller.popLooks);

router.delete('/:id', controller.delete);

module.exports = router;