const Users = require('./users-model');

const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} : [${req.method}] at ${req.url}`);
  next();
};

const validatePost = (req, res, next) => {
  const { username, password } = req.body;
  if (username.trim() === '' || !username || password.trim() === '' || !password) {
    res.status(400).json({ message: 'username and password are required' });
  } else {
    next();
  };
};

module.exports = {
  logger,
  validatePost
}