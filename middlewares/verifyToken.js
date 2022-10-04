const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  jwt.verify(authorization, process.env.JWT_SECRET, (err, data) => {
    if (err) return next(err);
    req.userId = data;
    next();
  });
};

module.exports = verifyToken;
