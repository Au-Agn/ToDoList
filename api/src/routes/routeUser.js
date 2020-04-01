const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../../user.json');
const userSchema = require('../validate/validate');
var Joi = require('joi');

router.post('/login', function (req, res, next) {
  Joi.validate(req.body, userSchema, (err, result) => {
    if (err) {
      res.status(500);
    }
    else if (req.body.login === user.login && req.body.password === user.password) {
      jwt.sign(user, 'user', (err, token) => {
        res.status(200).json({
          user,
          token
        });
      });
      return;
    }
    res.status(404);
  });
});

module.exports = router;