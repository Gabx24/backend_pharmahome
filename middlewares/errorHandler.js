const errorHandler = (error, req, res, next) => {
  console.log(error.stack);
  res.status(500).json({ error: error.message });
};

module.exports = errorHandler;
