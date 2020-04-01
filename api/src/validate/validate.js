var Joi = require('joi');

const userSchema = Joi.object().keys({
    login: Joi.string().max(10).required(),
    password: Joi.string().max(10).required()
  });

  module.exports = userSchema;
