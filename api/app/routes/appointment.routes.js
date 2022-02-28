module.exports = app => {
  const appointment = require('../controllers/appointment.controller.js');

  var router = require('express').Router();

  // Create a new Appointment
  router.post('/', appointment.create);

  router.get('', appointment.getRange);

  // Update a Appointment with id
  router.put('/:id', appointment.update);

  // Delete a Appointment with id
  router.delete('/:id', appointment.delete);


  app.use('/appointment', router);
};
