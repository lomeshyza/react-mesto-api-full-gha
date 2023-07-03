const { badRequest } = require('../utils/errors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = badRequest;
  }
}

module.exports = BadRequestError;
