/* function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      name: err.name,
      message,
      statusCode,
    },
  });
}
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      name: err.name || 'InternalServerError',
      message: err.message || 'Something went wrong!',
    },
  });
};


module.exports = errorHandler;
