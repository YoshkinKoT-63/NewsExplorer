const { celebrate, Joi } = require('celebrate');

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
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

module.exports.createArticleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(2).required(),
    title: Joi.string().min(2).required(),
    text: Joi.string().min(2).required(),
    date: Joi.string().min(6).required(),
    source: Joi.string().min(2).required(),
    link: Joi.string().required()
    .regex(/(http:|https:)\/\/((((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))|((www.)?\w+(-\w+)*(\.\w+(-\w+)*)+))(((\/\w+)+(\.|\/)?)|\/)*(.*)?(#[\w\-]+)?$/m), // eslint-disable-line
    image: Joi.string().required()
    .regex(/(http:|https:)\/\/((((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d))|((www.)?\w+(-\w+)*(\.\w+(-\w+)*)+))(((\/\w+)+(\.|\/)?)|\/)*(.*)?(#[\w\-]+)?$/m), // eslint-disable-line
  }),
});

module.exports.deleteArticleValidation = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex(),
  }),
});
