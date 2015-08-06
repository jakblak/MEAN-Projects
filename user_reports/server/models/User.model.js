var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    bcrypt: true,
    required: true
  }
});

// UserSchema.methods = {
//   authenticate: function(passwordToMatch) {
//     return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
//   }
// };

UserSchema.methods = {
  authenticate: function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  }
};

  module.exports = mongoose.model('User', UserSchema);

  module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  }

  module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
  }

  module.exports.getUserByUsername = function(username, callback) {
    var query = {
      username: username
    }
    User.findOne(query, callback);
  }

  module.exports.createUser = function(newUser, cb) {
    bcrypt.hash(newUser.password, 10, function(err, hash) {
      if (err) throw err;
      // Set hashed pw
      newUser.password = hash;

      console.log('User is being saved');
      // Save user to db
      newUser.save(cb);
    });
  }