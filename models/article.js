const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Не заполнено ключевое слово'],
  },
  title: {
    type: String,
    required: [true, 'Не заполнен заголовок'],
  },
  text: {
    type: String,
    required: [true, 'Не заполнен текст статьи'],
  },
  date: {
    type: String,
    required: [true, 'Нет заполнено поле с датой'],
  },
  source: {
    type: String,
    required: [true, 'Не указан источник'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(valid) {
        return validator.isURL(valid);
      },
      message: 'Неверный формат URL',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(valid) {
        return validator.isURL(valid);
      },
      message: 'Неверный формат URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
    ref: 'user',
  },
});

module.exports = mongoose.model('article', articleSchema);
