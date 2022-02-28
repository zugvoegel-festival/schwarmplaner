const router = require('express').Router();

const user = require('../controllers/user.controller');
const bubble = require('../controllers/bubble.controller');

module.exports = app => {
  // Create a new bubble
  router.post('/new', bubble.createBubbleAndUser);

  // Confirm password
  router.post('/confirm', user.confirmPasswordAndLogin);

  // Login
  router.post('/login', user.login);

  app.use('/auth', router);
};
