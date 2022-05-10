module.exports = app => {
  const user = require('../controllers/user.controller.js');

  var router = require('express').Router();

  // Retrieve a all User with calendar id
  router.get('/byCalendar', user.findByCalendarId);

  // check if a user exists
  router.get('/exists', user.userExists);

  // Retrieve a single User with id
  router.get('/valid', user.valid);
  // Create a new User
  router.post('/', user.create);

  // Get list of Users
  router.get('/getusers', user.getUsers);

  app.use('/user', router);
};
