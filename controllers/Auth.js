const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../configs/config');
const User = require('../models/UserSchema');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  User.findOne({ email })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          status: 500,
          success: false,
          message: err,
        });
      } else if (!user) {
        res.status(500).send({
          status: 404,
          success: false,
          message: 'User not found',
        });
      } else {
        user.comparePassword(password, (fault, isMatch) => {
          if (fault) {
            res.status(500).send({
              status: 500,
              success: false,
              message: fault,
            });
          }

          if (!isMatch) {
            res.status(500).send({
              status: 401,
              success: false,
              message: 'Password does not match',
            });
          } else {
            jwt.sign(
              { email, password },
              config.jwt.secretKey,
              { expiresIn: config.jwt.expiresIn },
              (fail, token) => {
                if (fail) {
                  res.status(500).send({
                    status: 500,
                    success: false,
                    message: fail,
                  });
                }

                res.status(200).header('Authorization', token).send({
                  status: 200,
                  success: true,
                  message: 'Login successful',
                  token,
                });
              },
            );
          }
        });
      }
    });
});

router.post('/register', (req, res) => {
  const newUser = new User();

  _.forEach(req.body, (value, index) => {
    newUser[index] = value;
  });

  newUser.save((err, user) => {
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
      message: 'Successful registration',
      data: user,
    });
  });
});

router.post('/checkEmail', (req, res) => {
  const { email } = req.body;

  User.findOne({ email })
    .exec((err, success) => {
      if (err) {
        res.status(500).send({
          status: 500,
          success: false,
          message: err,
        });
      }

      if (!success) {
        res.status(200).send({
          status: 200,
          success: true,
          message: 'E-mail can be used',
        });
      } else {
        res.status(200).send({
          status: 500,
          success: false,
          message: 'E-mail cannot be used',
        });
      }
    });
});

router.post('/checkUsername', (req, res) => {
  const { username } = req.body;

  User.findOne({ username })
    .exec((err, success) => {
      if (err) {
        res.status(500).send({
          status: 500,
          success: false,
          message: err,
        });
      }

      if (!success) {
        res.status(200).send({
          status: 200,
          success: true,
          message: 'Username can be used',
        });
      } else {
        res.status(200).send({
          status: 500,
          success: false,
          message: 'Username cannot be used',
        });
      }
    });
});

module.exports = router;
