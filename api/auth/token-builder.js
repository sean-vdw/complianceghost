const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

// Build JWT
const buildToken = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
    password: user.password
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = { buildToken };