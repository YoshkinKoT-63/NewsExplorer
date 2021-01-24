module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
  PORT: process.env.PORT || 3000,
  DATABASE: 'mongodb://localhost:27017/NewsExporerDb',
};
