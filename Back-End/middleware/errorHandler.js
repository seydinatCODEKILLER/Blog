export const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Une erreur interne est survenue.";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};
