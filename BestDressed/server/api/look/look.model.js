// add Tags

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LookSchema = new Schema({
  image: String,
  linkURL: String,
  title: String,
  description: String,
  tags: [{
    type: String
  }],
  email: String,
  createTime: {
    type: Date,
    'default': Date.now
  },
  views: {
    type: Number,
    'default': 0
  },
  upVotes: {
    type: Number,
    'default': 0
  }
});

module.exports = mongoose.model('Look', LookSchema);

// Old Schema
// var LookSchema = new Schema({
//   image: String,
//   linkURL:  String,
//   title: String,
//   description: String,
//   email: String,
//   createTime: {
//     type: Date,
//     'default': Date.now
//   },
//   createDate: Date,
//   upVotes: Number
// });
