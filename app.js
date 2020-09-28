/* eslint-disable consistent-return */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const articles = require('./routes/articles');
const { login, createUser } = require('./controllers/user');
const NotFoundError = require('./middlewares/errors/not-found-err');
const { createUserValidation, loginValidation } = require('./middlewares/validation');

// const errorLogger = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/NewsExporerDb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

// авторизация
app.use(auth);

app.use('/users', users);
app.use('/articles', articles);
app.use('/', (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  next(error);
});

// app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());
// централизованный обработчик ошибок

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  let { message } = err;
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: `Ошибка валидации:${err.message}` });
  }
  if (statusCode === 500) {
    message = 'На сервере произошла ошибка';
  }
  res
    .status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`сервер запущен на ${PORT} порту`);
});
/* eslint-enable consistent-return */
