const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../configs/config');

const router = express.Router();
const User = require('../models/UserSchema');

router.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'OK',
  });
});

router.post('/login', (req, res) => {
  const { email } = req.body;
  const { password } = req.body;

  User.findOne({ email })
    .exec((err, user) => {
      if (err) {
        console.log(err);
      } else if (!user) {
        res.status(404).send({
          success: false,
          message: 'User not found',
        });
      } else {
        user.comparePassword(password, (fault, isMatch) => {
          if (fault) console.log(fault);

          if (!isMatch) {
            res.status(401).send({
              success: false,
              message: 'Password not match',
            });
          } else {
            jwt.sign({ email, password }, config.jwt.secretKey, { expiresIn: '1s' }, (fail, token) => {
              if (fail) console.log(fail);

              res.status(200).send({
                success: true,
                message: 'Login success',
                token,
              });
            });
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
    if (err) console.log(err);

    res.status(201).send({
      success: true,
      message: 'User created',
      data: user,
    });
  });
});

module.exports = router;
