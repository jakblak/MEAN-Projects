'use strict';

var _ = require('lodash');
var Look = require('./look.model');
var path = require('path');

exports.create = function(req, res) {

  var post = new Look({
    image: req.body.imgThumb,
    // mediaType: req.body.mediaType;     // option for video
    // email: req.query.emailAddress;          // link to email/ID of user
    linkURL: req.body.link,
    title: req.body.title,
    description: req.body.description,
    createTime: Date.now(),
    createDate:  new Date(),
    upVotes:  0
  });
  post.save(function(err, item) {
    if(err) {
      console.log('error occured in saving post');
    } else {
      console.log('Success post saved');
      console.log(item);
      res.status(200)
           .json(item);
    }
  });
};

// Save from chrome extension snapIt
// exports.create = function(req, res) {
//   var media, url, title, description;

//   var message = new Look();
//   message.mediaType = req.query.mediaType;
//   message.media = req.query.media;
//   message.url = req.query.url;
//   message.title = req.query.title;
//   message.description = req.query.description;
//   message.email = req.query.emailAddress;
//   message.createTime = Date.now();
//   message.createDate = new Date();
//   message.upVotes = 0;
//   //successfullsnap = __dirname + '/../.././client/assets/images/snapSuccess.png'
//   message.save(function () {
//     res.send('<img src="http://localhost:9000/snapSuccess.png">');
//   });
// };

// This is for the blog list urls, the request passes in an array of
// articles from a particular blog
// exports.createRss = function(req, res) {

//   var array = req.body.feedArray;
//   var sendResponseBack = false;
//   var email = req.body.email;
//   var messagesArray = [];

//   for (var i = 0; i < array.length; i++) {
//     var feedObject = array[i];
//     var media, url, title, description;
//     var message = {};
//     message.mediaType = "rssFeed";
//     message.media = "";
//     message.url = feedObject.link;
//     message.title = feedObject.title;
//     message.description = feedObject.contentSnippet;
//     message.email = email;
//     message.createTime = Date.now();
//     message.createDate = new Date();
//     message.upVotes = 0;
//     messagesArray.push(message);

//   }
//     var onBulkInsert = function(err, myDocuments) {
//       if (err) {
//         return handleError(res, err);
//       }
//       else {
//         res.send(200);
//       }
//   }
//     // does a bulk save on all the array items
//     Thing.collection.insert(messagesArray, onBulkInsert);
// };


// Get list of things
exports.index = function(req, res) {
  Look.find({email:req.query.email},function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Look.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
  });
};


// updates upVote count when somebody upVotes an item
exports.update = function(req, res) {
  Look.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.upVotes++;
    thing.save(function(err){
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Look.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}