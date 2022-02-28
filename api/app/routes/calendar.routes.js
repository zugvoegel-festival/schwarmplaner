module.exports = app => {
  const calendar = require('../controllers/calendar.controller.js');

  var router = require('express').Router();

  router.post('/new', calendar.create);

  router.get('/:slug', calendar.findBySlug);

  app.use('/calendar', router);
};
