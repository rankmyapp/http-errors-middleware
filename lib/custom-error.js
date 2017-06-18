'use strict';

function CustomError(status, message, opts) {
  this.status = status;
  this.opts = opts;
  this.message = message || 'An error occured';
  this.stack = (new Error()).stack;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

module.exports = CustomError;
