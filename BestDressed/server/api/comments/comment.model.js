'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  gravatar: {
    type: String
  },
  comment: {
    type: String
  },
  createTime: {
    type: Date,
    'default': Date.now
  }
})

module.exports = mongoose.model('Comment', CommentSchema);