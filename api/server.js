const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

module.exports = server;
