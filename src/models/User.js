const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  fullname: {
    type: String,
    required: true,
    min: 6,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  phone: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  address: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
