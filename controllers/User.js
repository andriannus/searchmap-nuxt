const express = require('express');
// const _ = require('lodash');
// const auth = require('../middlewares/Authentication');

const router = express.Router();
const Place = require('../models/PlaceSchema');
const Shape = require('../models/ShapeSchema');

router.get('/:id/places', (req, res) => {
  const idUser = req.params.id;

  Place.find({ user: idUser })
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
          message: 'Get list places',
          data: places,
        });
      }
    });
});

router.get('/:id/shapes', (req, res) => {
  const { idUser } = req.params.id;

  Shape.find({ user: idUser })
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
          message: 'Get list shapes',
          data: shapes,
        });
      }
    });
});

module.exports = router;
