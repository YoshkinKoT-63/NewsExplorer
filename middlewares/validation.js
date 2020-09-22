const { celebrate, Joi } = require('celebrate');

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required()
    .regex(/(http:|https:)\/\/((((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))|((www.)?\w+(-\w+)*(\.\w+(-\w+)*)+))(((\/\w+)+(\.|\/)?)|\/)*(.*)?(#[\w\-]+)?$/m), // eslint-disable-line
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
