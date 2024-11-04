export const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Une erreur interne est survenue.";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};
