const ApiError = require('../utils/ApiError');

// 404 handler for routes that don't match anything.
const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

// Centralized error handler. Any error passed to next(err) — including
// ones thrown inside asyncHandler-wrapped routes — ends up here.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const payload = { error: err.message || 'Internal Server Error' };

  if (err.details) {
    payload.details = err.details;
  }

  if (statusCode === 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(statusCode).json(payload);
};

module.exports = { notFound, errorHandler, ApiError };
