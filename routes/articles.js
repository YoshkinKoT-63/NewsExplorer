const articles = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');
const { createArticleValidation, deleteArticleValidation } = require('../middlewares/validation');

articles.get('/', getArticles);
articles.post('/', createArticleValidation, createArticle);
articles.delete('/:articlesId', deleteArticleValidation, deleteArticle);

module.exports = articles;
