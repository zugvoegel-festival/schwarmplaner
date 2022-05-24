const db = require('../models');

const Location = db.Location;
const { logger } = require('../helpers/logger');
const moduleLogger = logger.child({ module: 'location controller' });

const { handleValidationError, handleInternalError, handleNotFound, handleSuccess } = require('../helpers/response');
// Create and Save a new Calendar
exports.create = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }
};
// Retrieve all shifts from the database.
exports.findAll = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  Location.findAll({
    where: req.query,
    raw: true
  })
    .then(data => {
      moduleLogger.debug('found  Location ');
      handleSuccess(res, 'found Location', data);
    })
    .catch(error => {
      moduleLogger.error(error);
    });
};
