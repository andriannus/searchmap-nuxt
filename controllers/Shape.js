const express = require('express');
const _ = require('lodash');
const auth = require('../middlewares/Authentication');
const Shape = require('../models/ShapeSchema');

const router = express.Router();

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
  const newShape = new Shape();

  _.forEach(req.body, (value, index) => {
    newShape[index] = value;
  });

  newShape.user = '5ba6021d6e0f412756a97715';

  newShape.save((err, shape) => {
    if (err) {
      res.status(500).send({
        status: 500,
        success: false,
        message: err,
      });
    }

    res.status(201).send({
      status: 201,
      success: true,
      message: 'Shape has been created',
      data: shape,
    });
  });
});

module.exports = router;
