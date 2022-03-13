const { handleValidationError, handleSuccess, handleInternalError } = require('../helpers/response');
const db = require('../models');

// Create and Save a new User
exports.create = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

};

exports.findByCalendarId = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

};

exports.isUserNameTaken = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

};
