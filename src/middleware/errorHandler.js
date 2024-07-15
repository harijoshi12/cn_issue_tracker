// src/middleware/errorHandler.js

/**
 * Global error handling middleware
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  // Log error in development environment
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  res.error(statusCode, message, err.errors);
};

export default errorHandler;
