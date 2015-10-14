'use strict';

var controller = require('./look.controller');
var express = require('express');
var router = express.Router();
var multer = require('multer');

router.post('/', controller.create);
router.post('/upload', multer({ dest: '../client/assets/images/uploads/'}), controller.upload);

router.put('/:id', controller.addUpvote);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/getUserLooks', controller.userLooks);
router.get('/getAllLooks', controller.allLooks);
router.get('/:id', controller.singleLook);


module.exports = router;