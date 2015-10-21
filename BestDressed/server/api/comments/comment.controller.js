var Comment = require('./comment.model');
var express = require('express');

exports.addComment = function(req, res) {
  var newComment = new Comment();
  newComment.author = req.body.name;
  newComment.email = req.body.email;
  newComment.gravatar = req.body.gravatar;
  newComment.createTime = Date.now();

  newComment.save(function(err, comment) {
    if(err) {
      console.log('error saving comment');
      return res.send(500);
    } else {
      console.log(comment);
      console.log('Comment saved to DB');
      res.status(200)
           .json(comment);
    }
  });
};

exports.getComments = function(req, res) {

}