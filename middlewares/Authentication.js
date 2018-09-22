const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const isAuthenticated = (req, res, next) => {
  const getToken = req.headers.authorization;
  const token = getToken.split(' ')[1];

  if (getToken && getToken.split(' ')[0] === 'Bearer') {
    jwt.verify(token, config.jwt.secretKey, (err) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Token expired',
        });
      }

      next();
    });
  } else {
    res.status(500).send({
      success: false,
      message: 'No token found',
    });
  }
};

module.exports.isAuthenticated = isAuthenticated;
