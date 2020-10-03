module.exports.errorsHandler = (err, req, res, next) => {
  const { statusCode = 500 } = err;

  if (statusCode === 500) {
    res.status(statusCode).send({ message: 'на сервере произошла ошибка' });
  } else {
    res.status(statusCode).send({ message: err.message });
  }

  next();
};
