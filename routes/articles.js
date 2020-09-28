const articles = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

articles.get('/', getArticles);
articles.post('/', createArticle);
articles.delete('/:articlesId', deleteArticle);

module.exports = articles;
