// add Tags

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LookSchema = new Schema({
  image: String,
  mediaType: String,
  linkURL:  String,
  title: String,
  description: String,
  email: String,
  createTime: Number,
  createDate: Date,
  upVotes: Number
});

module.exports = mongoose.model('Look', LookSchema);