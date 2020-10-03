const Article = require('../models/article');
const NotFoundError = require('../middlewares/errors/not-found-err');
const ForbiddenErr = require('../middlewares/errors/rorbidden-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate('owner')
    .then((article) => res.status(200).send({ data: article }))
    .catch(next);
};

// создаёт статью с переданными в теле
// keyword, title, text, date, source, link и image
module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

// удаление статьи по id
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Нет карточки с таким id');
      } else if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenErr('Невозможно удалить чужую карточку');
      } else {
        return Article.deleteOne(article);
      }
    })
    .then(() => {
      res.send({ message: 'статья удалена' });
    })
    .catch(next);
};
