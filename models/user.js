const mongoose = require('mongoose');

/**
 * simple user model with
 * required email and password
 * fields
 */

module.exports = mongoose.model('User', new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
}));
