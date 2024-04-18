const express = require('express');
const server = express();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const { validateEmptyFields, validateUsername, hashPassword } = require('./auth/auth-middleware');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter, validateEmptyFields, validateUsername, hashPassword); 

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;