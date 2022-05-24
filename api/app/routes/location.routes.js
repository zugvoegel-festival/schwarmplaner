module.exports = app => {
  const location = require('../controllers/location.controller.js');

  var router = require('express').Router();

  router.post('/new', location.create);

  router.get('', location.findAll);

  app.use('/locations', router);
};
