const { handleValidationError, handleSuccess, handleInternalError } = require('../helpers/response');
const db = require('../models');
const User = db.User;
const Calendar = db.Calendar;

// Create and Save a new User
exports.create = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  let calendarId = parseInt(req.body.calendarId);
  // Create a User
  const user = {
    name: req.body.name,
    email: req.body.email,
    calendarId: calendarId
  };

  Calendar.findByPk(calendarId)
    .then(myCalendar => {
      User.create(user)
        .then(myUser => {
          myCalendar
            .addUser(myUser)
            .then(data => {
              handleSuccess(res, `Added User ${user.name} to calendar`, {
                name: myUser.dataValues.name,
                id: myUser.dataValues.id,
                calendarId: myUser.dataValues.calendarId
              });
            })
            .catch(err => {
              handleInternalError(res, err.message || 'Some error occured while creatig the User.');
            });
        })
        .catch(err => {
          handleInternalError(res, err.message || 'Some error occured while creatig the User.');
        });
    })
    .catch(err => {
      handleInternalError(res, err.message || 'Some error occured while creatig the Appointment.');
    });
};

exports.findByCalendarId = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  let calId = parseInt(req.query.calendarId);
  User.findAll({ where: { calendarId: calId }, attributes: ['name', 'id', 'calendarId'] })
    .then(data => {
      handleSuccess(res, 'I did find the calendar you are looking for', data);
    })
    .catch(err => {
      handleInternalError(res, err.message || 'Some error occurred while retrieving Users.');
    });
};

exports.isUserNameTaken = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
  let calId = parseInt(req.query.calendarId);

  let name = req.query.user;
  User.findAll({ where: { calendarId: calId, name: name } })
    .then(data => {
      if (data.length > 0) {
        handleSuccess(res, 'Username is not available', false);
      } else {
        handleSuccess(res, 'Username is available', true);
      }
    })
    .catch(err => {
      handleInternalError(res, err.message || 'Some error occurred while retrieving Users.');
    });
};
