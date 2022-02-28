const { repeatations } = require('../config/enums');
const { handleSuccess, handleInternalError, handleNotFound,handleValidationError } = require('../helpers/response');
const db = require('../models');
const Appointment = db.Appointment;
const Calendar = db.Calendar;
const Op = db.Sequelize.Op;

// Create and Save a new Appointment
exports.create = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  // Create a Appointment
  const appointment = {
    calendarId: req.body.calendarId,
    name: req.body.name,
    start: parseInt(req.body.start),
    end: parseInt(req.body.end),
    isVirtual: req.body.isVirtual,
    parentId: req.body.parentId,
    color: req.body.color,
    timed: req.body.timed,
    repeatation: req.body.repeatation,
    attachedPersons: req.body.attachedPersons,
    description: req.body.description,
    modified: req.body.modified
  };

  Calendar.findByPk(appointment.calendarId)
    .then(myCalendar => {
      Appointment.create(appointment)
        .then(myAppointment => {
          myCalendar
            .addAppointment(myAppointment)
            .then(data => {
              handleSuccess(res, 'Created appointment', myAppointment.dataValues);
            })
            .catch(err => {
              handleInternalError(res, err.message || 'Some error occurred while creating the Appointment.');
            });
        })
        .catch(err => {
          handleInternalError(res, err.message || 'Some error occurred while creating the Appointment.');
        });
    })
    .catch(err => {
      handleInternalError(res, err.message || 'Some error occurred while creating the Appointment.');
    });
  // Save Appointment in the database
};

// Retrieve all Appointments from the database.
exports.getRange = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;

  }

  let start = parseInt(req.query.start);
  let end = parseInt(req.query.end);
  let calendarId = parseInt(req.query.calendarId);

  let responseData = {};
  Appointment.findAll({
    where: {
      calendarId: calendarId,
      [Op.or]: {
        start: { [Op.between]: [start, end] },
        end: { [Op.between]: [start, end] }
      },
      repeatation: repeatations.SINGLE
    }
  }).then(data => {
    responseData.single = data;
    Appointment.findAll({
      where: {
        calendarId: calendarId,
        end: { [Op.lte]: end },
        repeatation: repeatations.DAILY
      }
    }).then(data => {
      responseData.daily = data;
      Appointment.findAll({
        where: {
          calendarId: calendarId,
          end: { [Op.lte]: end },
          repeatation: repeatations.WEEKLY
        }
      }).then(data => {
        responseData.weekly = data;
        Appointment.findAll({
          where: {
            calendarId: calendarId,
            end: { [Op.lte]: end },
            repeatation: repeatations.FOURWEEKLY
          }
        }).then(data => {
          responseData.fourWeekly = data;
          handleSuccess(res, 'did find all appointments you where asking for', responseData);
        });
      });
    });
  });
};

// Update a Appointment by the id in the request
exports.update = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
  const id = req.params.id;

  Appointment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        handleSuccess(res, 'Appointment was updated successfully.');
      } else {
        handleNotFound(
          res,
          `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty!`
        );
      }
    })
    .catch(err => {
      handleInternalError(err.message || `Error updating Appointment with id=${id}`);
    });
};

// Delete a Appointment with the specified id in the request
exports.delete = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
  const id = req.params.id;

  Appointment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        handleSuccess(res, 'Appointment was deleted successfully!');
      } else {
        handleNotFound(res, `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`);
      }
    })
    .catch(err => {
      handleInternalError(res, err.message || `Could not delete Appointment with id=${id}`);
    });
};
