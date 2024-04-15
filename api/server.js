const express = require('express');
const server = express();
const cors = require('cors');
const path = require('path');

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const restricted = require('./middleware/restricted');

server.use(express.json());
server.use(cors());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;