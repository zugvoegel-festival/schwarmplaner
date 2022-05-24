module.exports = app => {
  const job = require('../controllers/job.controller.js');

  var router = require('express').Router();

  router.post('/new', job.create);

  router.get('', job.findAll);

  app.use('/jobs', router);
};
