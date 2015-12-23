var mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/userReports');
    mongoose.connection.on('open', function() {
      console.log('mongoose connected');
    });
}