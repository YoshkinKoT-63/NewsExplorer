/* eslint-disable consistent-return, newline-per-chained-call, object-curly-newline */
const bcrypt = require('bcryptjs');
const PasswordValidator = require('password-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../middlewares/errors/not-found-err');
const Conflict = require('../middlewares/errors/conflict-err');
const Unauthorized = require('../middlewares/errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;
const passwordValidatorSchema = new PasswordValidator();

passwordValidatorSchema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();

module.exports.getUser = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  const { _id } = jwt.decode(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        const { name, email } = user;
        res.send({ name, email });
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!passwordValidatorSchema.validate(password)) {
    throw new Unauthorized('пароль должен быть не менее 8 символов, содержать заглавные и строчные буквы, цифры');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then(() => res.send({ email, name }))
    .catch((err) => {
      if (err.code === 11000) {
        throw new Conflict('Этот email уже используется');
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};
/* eslint-disable consistent-return, newline-per-chained-call, object-curly-newline */
