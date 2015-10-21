'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  author: {
    id: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    name: String
  },
  email: {
    type: String
  },
  gravatar: {
    type: String
  },
  comment: {
    type: String,
    trim: true
  },
  createTime: {
    type: Date,
    'default': Date.now
  }
})

module.exports = mongoose.model('Comment', CommentSchema);