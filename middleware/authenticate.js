const jwt = require('jsonwebtoken');

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const authenticate = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      succes: false,
      message: 'no authorizarion token error',
    });
  }
  jwt.verify(token, 'authsecret', (err, decoded) => {
    if (err) {
      return res.json({
        success: false,
        message: 'authorization error',
      });
    }
    req.decoded = decoded;
    next();
    return null;
  });
  return null;
};

module.exports = authenticate;
