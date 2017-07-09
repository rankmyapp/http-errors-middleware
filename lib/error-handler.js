'use strict';

const http = require('http');

const errorHandler = ( opts = {} ) => 
  (err, req, res, next) => {
    if (opts.debug) {
      console.error(err);
    }

    const statusCode = err.status || err.statusCode || 500;
  
    res.status(statusCode).json({
      error: {
        title: http.STATUS_CODES[statusCode],
        name: err.name,
        message: err.message
      }
    });
    return next();
  };

module.exports = errorHandler;
