const users = require('express').Router();
const { getUser } = require('../controllers/user');

users.get('/me', getUser);

module.exports = users;
