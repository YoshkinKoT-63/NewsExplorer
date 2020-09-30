/* eslint-disable consistent-return */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const routes = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { DATABASE, PORT } = require('./config');

// подключаемся к серверу mongo
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
// централизованный обработчик ошибок

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  let { message } = err;
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: `Ошибка валидации:${err.message}` });
  }
  if (statusCode === 500) {
    message = err.message;
  }
  res
    .status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`сервер запущен на ${PORT} порту`);
});
/* eslint-enable consistent-return */
