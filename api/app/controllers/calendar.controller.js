const db = require('../models');
const uuid = require('uuid'); // ES5
const Calendar = db.Calendar;
const User = db.User;

const { handleValidationError, handleInternalError, handleNotFound, handleSuccess } = require('../helpers/response');
// Create and Save a new Calendar
exports.create = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  // Save Calendar in the database
  let data = {
    slug: uuid.v4(),
    name: req.body.orgalendarName
  };
  Calendar.create(data)
    .then(myCalendar => {
      User.create({
        name: req.body.username,
        email: req.body.email
      })
        .then(myUser => {
          myCalendar
            .addUser(myUser)
            .then(calendar => {
              handleSuccess(res, 'created user and calendar succesfull', {
                calendar: {
                  id: calendar.dataValues.id,
                  slug: calendar.dataValues.slug,
                  name: calendar.dataValues.name
                },
                user: {
                  id: myUser.dataValues.id,
                  calendarId: calendar.dataValues.id,
                  name: myUser.dataValues.name
                }
              });
            })
            .catch(err => {
              handleInternalError(res, err.message || 'Some error occurred while adding User to calendar.');
            });
        })
        .catch(err => {
          handleInternalError(res, err.message || 'Some error occurred while creating the User.');
        });
    })
    .catch(err => {
      handleInternalError(res, err.message || 'Some error occurred while creating the Calendar.');
    });
};
// Find a single Calendar with slug
exports.findBySlug = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  const slug = req.params.slug;
  Calendar.findAll({ where: { slug: slug } })
    .then(data => {
      if (data.length != 0) {
        let returnValue = {
          id: data[0].id,
          slug: data[0].slug,
          name: data[0].name
        };
        handleSuccess(res, 'Found Calendar', returnValue);
      } else {
        handleNotFound(res, `Cannot find Calendar with slug=${slug}.`);
      }
    })

    .catch(err => {
      handleInternalError(res, err.message || 'Error retrieving Calendar with slug=slug=${slug}.');
    });
};
