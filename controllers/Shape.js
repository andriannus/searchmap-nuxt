const express = require('express');
const auth = require('../middlewares/Authentication');
// const _ = require('lodash');

const route = express.Router();

route.post('/', auth.isAuthenticated, (req, res) => {
  const { name } = req.body;

  res.status(201).send({
    success: true,
    place: name,
  });
});

module.exports = route;
