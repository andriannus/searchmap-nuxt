const express = require('express');
const auth = require('../middlewares/Authentication');
// const _ = require('lodash');

const router = express.Router();
const Shape = require('../models/ShapeSchema');

router.get('/', (req, res) => {
  Shape.find()
    .populate('user')
    .exec((err, shapes) => {
      if (err) {
        res.status(500).send({
          status: 500,
          success: false,
          message: err,
        });
      } else {
        res.status(200).send({
          status: 200,
          success: true,
          message: 'Get a list of shapes',
          data: shapes,
        });
      }
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Shape.findById(id)
    .populate('user')
    .exec((err, shape) => {
      if (err) {
        res.status(500).send({
          status: 500,
          success: false,
          message: err,
        });
      }

      res.status(200).send({
        status: 200,
        success: true,
        message: 'Get a shape',
        data: shape,
      });
    });
});

router.post('/', auth.isAuthenticated, (req, res) => {
  const { name } = req.body;

  res.status(201).send({
    status: 201,
    success: true,
    place: name,
  });
});

module.exports = router;
