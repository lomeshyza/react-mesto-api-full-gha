const INTERNAL_SERVER_ERROR = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR
        ? 'Internal Server Error'
        : message,
    });
  next();
};

module.exports = errorHandler;
