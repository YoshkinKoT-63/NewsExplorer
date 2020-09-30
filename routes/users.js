const users = require('express').Router();
const { getUser, login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { createUserValidation, loginValidation } = require('../middlewares/validation');

users.post('/signin', loginValidation, login);
users.post('/signup', createUserValidation, createUser);

// авторизация
users.use(auth);

// получить данные пользователя
users.get('/users/me', getUser);

module.exports = users;
