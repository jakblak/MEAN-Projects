var Report = require('../models/Report.model');

exports.list = function(req, res) {
  var query = Report.find();

  query.sort({ createdOn: 'desc' })    // In descending order
    .limit(12)
    .exec(function(err, results) {
      if(err){
        console.log('Error retreiving reports');
      }
      return res.json(results)
    });
}
// exports.list2 = function (req, res) {
//   Report.find({}, function (err, reports) {
//     if(err) {
//       console.log(err);
//     }
//    return res.json(reports);
//   });
// }

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
        console.log('Success, meeting note was saved!');
        res.status(200).end();
    }
  });
};