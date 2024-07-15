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

  if (req.xhr || req.headers.accept.indexOf("json") > -1) {
    // Send JSON response for API requests
    res.status(statusCode).json({
      success: false,
      message,
      errors: err.errors || {},
    });
  } else {
    // Render error page for non-API requests
    res.status(statusCode).render("error", {
      title: "Error",
      message,
      errors: err.errors || {},
      messages: req.flash(),
    });
  }
};

export default errorHandler;
