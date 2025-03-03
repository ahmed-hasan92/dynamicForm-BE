const errorHandler = async (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json(err.message || { message: 'Internal server error' });
};

module.exports = errorHandler;
