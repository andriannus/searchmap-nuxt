const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  avatar: {
    type: String,
    default: 'avatar.jpg',
  },
});

userSchema.pre('save', function encrypt(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);

    bcrypt.hash(user.password, salt, (fault, hash) => {
      if (fault) next(fault);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function compare(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) callback(err);

    callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
