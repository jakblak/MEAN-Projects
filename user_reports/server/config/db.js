var mongoose = require('mongoose');
// var UserModel = require('../models/User.model');

module.exports = function() {
    mongoose.connect('mongodb://localhost/userReports');
    mongoose.connection.on('open', function() {
      console.log('mongoose connected');
    });
}