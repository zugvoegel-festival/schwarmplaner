module.exports = app => {
  const location = require('../controllers/location.controller.js');

  var router = require('express').Router();

  router.post('/new', location.create);


  router.get('/:slug', location.findBySlug);

  app.use('/location', router);
};
