const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports = {
  /**
   * @param  {Object} data
   */
  createUser(data) {
    return bcrypt.hash(data.password, 10)
      .then(hash => new User({
        email: data.email,
        password: hash,
      }).save().then(() => true))
      .catch((err) => { throw err; });
  },


  /**
   * @param  {Object} data
   */
  login(data) {
    return User.findOne({ email: data.email })
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error('Authentication failed, user not found'));
        }
        if (bcrypt.compare(data.password, user.password)) {
          const webToken = jwt.sign(
            { _id: user._id, email: user.email },
            'authsecret', { expiresIn: '24h' },
          );
          return webToken;
        }
        return Promise.reject(new Error('Authentication failed, password error'));
      }).catch((err) => { throw err; });
  },
};
