const {
  handleValidationError,
  handleSuccess,
  handleInternalError,
  handleCustomValidationError
} = require('../helpers/response');
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

  if (!req.body.email) {
    handleInternalError(res, 'missing data');
    moduleLogger.error('no email in data');
    return;
  }
  if (!req.body.surname) {
    handleInternalError(res, 'missing data');
    moduleLogger.error('no surname in data');
    return;
  }
  if (!req.body.lastname) {
    jandleInternalError(res, 'missing data');
    moduleLogger.error('no lastname in data');
    return;
  }
  if (!req.body.phone) {
    handleInternalError(res, 'missing data');
    moduleLogger.error('no phone in data');
    return;
  }
  if (!req.body.role) {
    handleInternalError(res, 'missing data');
    moduleLogger.error('no role in data');
    return;
  }
  if (!req.body.type) {
    handleInternalError(res, 'missing data');
    moduleLogger.error('no type in data');
    return;
  }

  User.findOrCreate({ where: req.body })
    .then(([user, created]) => {
      moduleLogger.debug(user, created);
      if (created) {
        handleSuccess(res, 'user created', {
          user: {
            id: user.id,
            role: user.role,
            type: user.type
          }
        });
      }
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
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
    handleInternalError(res, 'no email in query paramter');
    moduleLogger.error('no email in query paramter');
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
        handleSuccess(res, 'no user found', {
          user: {
            found: false
          }
        });
      } else {
        handleSuccess(res, 'user found', {
          user: {
            found: true,
            type: data[0].type,
            role: data[0].role,
            id: data[0].id
          }
        });
      }
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};

exports.valid = (req, res) => {
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
  User.findAll({
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
