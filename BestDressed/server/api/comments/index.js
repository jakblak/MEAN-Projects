'use strict';

var controller = require('./comment.controller');
var express = require('express');
var router = express.Router();

// Request Test
router.post('/', controller.addComment);
router.get('/:id', controller.getComments);

module.exports = router;
