const router = require('express').Router();
const Users = require('../users/users-model');
const { validateEmptyFields, validateUsername, hashPassword } = require('./auth-middleware');

router.post('/register', validateEmptyFields, validateUsername, hashPassword, (req, res, next) => {
  Users.createUser(user)
    .then(newUser => {
      res.status(201).json({ message: `Successfully registered ${newUser.username}`});
    })
    .catch(next);
});

module.exports = router;