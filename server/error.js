const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

module.exports = { createError, errorHandler };
