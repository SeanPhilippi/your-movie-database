const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// attaches req.user from JWT if a valid token is present, otherwise continues unauthenticated
const attachUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }
  try {
    const token = authHeader.slice(7);
    req.user = jwt.verify(token, keys.secret);
    next();
  } catch {
    next();
  }
};

module.exports = attachUser;
