// Lightweight error type carrying an HTTP status code, so route handlers
// can `throw new ApiError(404, 'Ticket not found')` and the shared error
// handler middleware maps it to the right response.
class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = ApiError;
