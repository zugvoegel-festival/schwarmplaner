const { handleValidationError, handleSuccess, handleInternalError, handleCustomValidationError } = require('../helpers/response');
const db = require('../models');
const User = db.User;
const { logger } = require('../helpers/logger');
const { response } = require('express');

const moduleLogger = logger.child({ module: 'user route' });

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

exports.userExists = (req, res) => {
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  let reqEmail = req.query.email;

  if (!reqEmail) {
    handleInternalError(res, "no email in query paramter");
     moduleLogger.error("no email in query paramter");
    return;
  }

  User.findAll({
    where: {
      email: reqEmail
    }
  })
    .then(data => {
      moduleLogger.debug(data);
      if (data.length == 0) {
        handleSuccess(res, "no user found", {
          user: {
            found: false
        }})
      } else {
         handleSuccess(res, "user found", {
          user: {
            found: true
        }})
      }
    })
    .catch(error => {
      moduleLogger.debug(error);
    });

};
