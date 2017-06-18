'use strict';

const http = require('http');

module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      title: http.STATUS_CODES[statusCode],
      message: err.message
    }
  });
  return next();
};
