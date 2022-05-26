module.exports = app => {
  const shift = require('../controllers/shift.controller.js');

  var router = require('express').Router();

  router.get('', shift.findAll);

  router.get('/dates', shift.getDates);

  // Create a new Appointment
  router.post('/', shift.create);

  // Update a Appointment with id
  router.put('/:id', shift.update);

  // Delete a Appointment with id
  router.delete('/:id', shift.delete);

  app.use('/shifts', router);
};
