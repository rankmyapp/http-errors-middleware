const server = require('express')();

server.use('/error', (req, res, next) => {
  next(Error('Intentional Error'));
});

module.exports = server;
