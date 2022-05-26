const { handleSuccess, handleInternalError, handleNotFound, handleValidationError } = require('../helpers/response');
const db = require('../models');
const Shift = db.Shift;
const { logger } = require('../helpers/logger');
const moduleLogger = logger.child({ module: 'shift controller' });
const moment = require('moment');

// Create and Save a new Appointment
exports.create = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  // Save Appointment in the database
};

// Retrieve all shifts from the database.
exports.findAll = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  Shift.findAll({
    where: req.query,
    raw: true
  })
    .then(data => {
      moduleLogger.debug('found  shifts ');
      handleSuccess(res, 'found shifts', data);
    })
    .catch(error => {
      moduleLogger.error(error);
    });
};

exports.getDates = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  Shift.findAll({
    attributes: ['start'],
    group: 'start',
    where: req.query,
    raw: true
  })
    .then(data => {
      moduleLogger.debug('found shifts ');
      let dates = new Map();

      data.forEach(element => {
        let date = moment(element.start, 'YYYY-MM-DD HH:mm:ss');
        dates.set(date.format('DD.MM.YYYY'), date.format('DD.MM.YYYY'));
      });
      data = Array.from(dates, ([name, value]) => value);

      handleSuccess(res, 'found shifts', data);
    })
    .catch(error => {
      moduleLogger.error(error);
    });
};

// Update a Appointment by the id in the request
exports.update = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
};

// Delete a Appointment with the specified id in the request
exports.delete = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
};
