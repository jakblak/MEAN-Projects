// add Tags

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LookSchema = new Schema({
  image: String,
  linkURL:  String,
  title: String,
  description: String,
  email: String,
  createTime: {
    type: Date,
    'default': Date.now
  },
  createDate: Date,
  upVotes: Number
});

module.exports = mongoose.model('Look', LookSchema);