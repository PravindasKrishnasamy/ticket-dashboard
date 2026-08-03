const ApiError = require('../utils/ApiError');

const CATEGORY_OPTIONS = ['Hardware', 'Software', 'Network', 'Account Access', 'Other'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];
const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved', 'Closed'];
const EMAIL_REGEX = /\S+@\S+\.\S+/;

/**
 * Validates the request body for ticket create/update.
 * @param {{ partial?: boolean }} options - `partial: true` allows PUT
 *   requests to omit fields that aren't changing (falls back to existing
 *   behavior of requiring everything on create).
 */
const validateTicket = ({ partial = false } = {}) => (req, res, next) => {
  const body = req.body || {};
  const errors = [];

  const isPresent = (key) => Object.prototype.hasOwnProperty.call(body, key);
  const requireField = (key, label) => {
    if (!partial || isPresent(key)) {
      if (!body[key] || !String(body[key]).trim()) {
        errors.push(`${label} is required`);
      }
    }
  };

  requireField('title', 'Title');
  requireField('requester_name', 'Requester name');
  requireField('requester_email', 'Requester email');

  if (body.requester_email && !EMAIL_REGEX.test(body.requester_email)) {
    errors.push('Requester email must be a valid email address');
  }

  if (isPresent('category') && body.category && !CATEGORY_OPTIONS.includes(body.category)) {
    errors.push(`Category must be one of: ${CATEGORY_OPTIONS.join(', ')}`);
  }

  if (isPresent('priority') && body.priority && !PRIORITY_OPTIONS.includes(body.priority)) {
    errors.push(`Priority must be one of: ${PRIORITY_OPTIONS.join(', ')}`);
  }

  if (isPresent('status') && body.status && !STATUS_OPTIONS.includes(body.status)) {
    errors.push(`Status must be one of: ${STATUS_OPTIONS.join(', ')}`);
  }

  if (errors.length) {
    return next(new ApiError(400, 'Validation failed', errors));
  }

  // Apply sensible defaults on create so the model layer always has values.
  if (!partial) {
    body.category = body.category || 'Other';
    body.priority = body.priority || 'Medium';
    body.status = body.status || 'Open';
  }

  return next();
};

module.exports = validateTicket;
