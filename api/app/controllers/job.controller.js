const db = require('../models');

const job = db.job;
const { logger } = require('../helpers/logger');
const moduleLogger = logger.child({ module: 'job controller' });

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

  job
    .findAll({
      where: req.query,
      raw: true
    })
    .then(data => {
      moduleLogger.debug('found  job ');
      handleSuccess(res, 'found job', data);
    })
    .catch(error => {
      moduleLogger.error(error);
    });
};
