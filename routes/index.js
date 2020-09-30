const router = require('express').Router();

const userRouter = require('./users');
const articleRouter = require('./articles');

const NotFoundError = require('../middlewares/errors/not-found-err');

router.use('/', userRouter);
router.use('/articles', articleRouter);
router.use('/', (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  next(error);
});

module.exports = router;
