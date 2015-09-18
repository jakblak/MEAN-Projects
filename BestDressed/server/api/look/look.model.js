'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LookSchema = new Schema({
  media: String,
  url:  String,
  title: String,
  description: String,
  email: String,
  mediaType: String,
  createTime: Number,
  createDate: Date,
  upVotes: Number
});

module.exports = mongoose.model('Look', LookSchema);