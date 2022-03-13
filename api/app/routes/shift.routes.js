module.exports = app => {
  const shift = require('../controllers/shift.controller.js');

  var router = require('express').Router();

  // Create a new Appointment
  router.post('/', shift.create);

  router.get('', shift.getRange);

  // Update a Appointment with id
  router.put('/:id', shift.update);

  // Delete a Appointment with id
  router.delete('/:id', shift.delete);



  app.use('/shift', router);
};
