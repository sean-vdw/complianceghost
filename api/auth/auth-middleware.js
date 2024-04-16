const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');
const { BCRYPT_ROUNDS } = require('../secrets');
const { buildToken } = require('./token-builder');

// Check for empty fields
const validateEmptyFields = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 401, message: 'Username and password are required' });
  } else {
    next();
  };
};

// Check for existing username
const validateUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const [user] = await Users.getBy({ username });
    if (user) {
      next({ status: 401, message: 'Username already exists' });
    } else {
      next();
    }
  } catch(err) {
    next(err);
  };
};

// Hash Password
const hashPassword = (req, res, next) => {
  const { username, password } = req.body;
  const rounds = BCRYPT_ROUNDS;
  const hash = bcrypt.hashSync(password, rounds);
  req.body = { username, password: hash };
  next();
};

module.exports = {
  validateEmptyFields,
  validateUsername,
  hashPassword
}