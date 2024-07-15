// src/middleware/responseHandler.js

/**
 * Sets up custom response methods for consistent API responses
 * @param {Object} app - Express application instance
 */
export const setupResponseHandler = (app) => {
  app.use((req, res, next) => {
    /**
     * Sends a success response
     * @param {number} statusCode - HTTP status code
     * @param {string} message - Success message
     * @param {Object} data - Response data
     */
    res.success = (statusCode, message, data = {}) => {
      if (req.xhr || req.headers.accept.indexOf("json") > -1) {
        return res.status(statusCode).json({
          success: true,
          message,
          data,
        });
      }
      req.flash("success", message);
      return res.redirect("back");
    };

    /**
     * Sends an error response
     * @param {number} statusCode - HTTP status code
     * @param {string} message - Error message
     * @param {Object} errors - Detailed errors object
     */
    res.error = (statusCode, message, errors = {}) => {
      if (req.xhr || req.headers.accept.indexOf("json") > -1) {
        return res.status(statusCode).json({
          success: false,
          message,
          errors,
        });
      }
      req.flash("error", message);
      return res.redirect("back");
    };

    next();
  });
};
