'use strict';

var controller = require('./look.controller');
var express = require('express');
var router = express.Router();

// Request Test
router.post('/request', controller.request);
// router.post('/testGetImage', controller.testGetImage)

router.post('/', controller.create);
router.post('/upload', controller.upload);

router.put('/:id', controller.addUpvote);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/getUserLooks', controller.userLooks);
router.get('/getAllLooks', controller.allLooks);
router.get('/:id', controller.singleLook);


module.exports = router;













