const { handleSuccess, handleInternalError, handleNotFound, handleValidationError } = require('../helpers/response');
const db = require('../models');
const Shift = db.Shift;
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

  let reqSurname = req.query.surname;

  if (!reqSurname) {
    handleInternalError(res, 'missing parameter');
    moduleLogger.error('no surname in query paramter');
    return;
  }
  let reqId = req.query.id;

  if (!reqId) {
    handleInternalError(res, 'missing parameter');
    moduleLogger.error('no id in query paramter');
    return;
  }
  Shift.findAll({
    where: {
      surname: reqSurname,
      id: reqId
    }
  })
    .then(data => {
      moduleLogger.debug(data);
      if (data.length == 0) {
        handleSuccess(res, 'no valid surname', {
          user: {
            valid: false
          }
        });
      } else {
        handleSuccess(res, 'valid surname', {
          user: {
            valid: true
          }
        });
      }
    })
    .catch(error => {
      moduleLogger.debug(error);
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
