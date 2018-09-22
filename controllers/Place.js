const express = require('express');
const _ = require('lodash');
const auth = require('../middlewares/Authentication');

const router = express.Router();
const Place = require('../models/PlaceSchema');

router.get('/', (req, res) => {
  Place.find()
    .populate('user', 'avatar name username')
    .exec((err, places) => {
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
          message: 'List of places',
          data: places,
        });
      }
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Place.findById(id)
    .populate('user', 'avatar name username')
    .exec((err, place) => {
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
          message: 'Get place',
          data: place,
        });
      }
    });
});

router.post('/', auth.isAuthenticated, (req, res) => {
  const newPlace = new Place();

  _.forEach(req.body, (value, index) => {
    newPlace[index] = value;
  });

  newPlace.user = '5ba6021d6e0f412756a97715';

  newPlace.save((err, place) => {
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
      message: 'Place created',
      data: place,
    });
  });
});

module.exports = router;
