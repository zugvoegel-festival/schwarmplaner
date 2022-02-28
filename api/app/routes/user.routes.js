module.exports = app => {
  const user = require('../controllers/user.controller.js');

  var router = require('express').Router();

  // Retrieve a all User with calendar id
  router.get('/byCalendar', user.findByCalendarId);

  // Retrieve a single User with id
  router.get('/exists', user.isUserNameTaken);
  // Create a new User
  router.post('/', user.create);

  app.use('/user', router);
};
