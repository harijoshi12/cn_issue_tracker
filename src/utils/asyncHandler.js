// src/utils/asyncHandler.js

/**
 * Wraps an async function to catch any errors and pass them to the next middleware
 * @param {Function} fn - Async function to be wrapped
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
