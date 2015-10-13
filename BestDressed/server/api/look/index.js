'use strict';

var express = require('express');
var controller = require('./look.controller');

var router = express.Router();

router.post('/', controller.create);
router.put('/:id', controller.addUpvote);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/getUserLooks', controller.userLooks);
router.get('/getAllLooks', controller.allLooks);
router.get('/:id', controller.singleLook);


module.exports = router;