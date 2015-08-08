var Report = require('../models/Report.model');

exports.create = function(req, res) {
  var entry = new Report({
    memberName: req.body.memberName,
    project: req.body.project,
    workYesterday: req.body.workYesterday,
    workToday: req.body.workToday,
    notes: req.body.notes
  });
  entry.save(function(err) {
    if(err) {
      console.log('Error occured in saving report');
    } else {
        console.log('Stand-up meeting note was saved!');
        res.status(200).end();
    }
  });
};