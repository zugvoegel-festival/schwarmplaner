// eslint-disable-next-line no-unused-vars
const _ = require('lodash');
const { validationResult } = require('express-validator');
// eslint-disable-next-line no-unused-vars
const { getTokenData } = require('./auth.helper');

const emitValidationResponse = (res, errorArray) =>
  res.status(422).json({
    success: false,
    status: 422,
    message: errorArray.length === 1 ? 'There is a validation error.' : 'There are validation errors.',
    data: errorArray
  });

const handleValidationError = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    return emitValidationResponse(res, errorArray);
  }
  return null;
};

const handleCustomValidationError = (res, errorArray) => emitValidationResponse(res, errorArray);

const handleSuccess = (res, message, data) =>
  res.status(200).send({
    success: true,
    status: 200,
    message,
    data
  });

const handleNotFound = (res, message) =>
  res.status(404).json({
    success: false,
    status: 404,
    message,
    data: {}
  });
const handleForbidden = (res, message) =>
  res.status(403).json({
    success: false,
    status: 403,
    message,
    data: {}
  });

const handleInternalError = (res, message) => {
  res.status(500).json({
    success: false,
    status: 500,
    message,
    data: {}
  });
};
const handleRedirect = (res, status, url) => res.redirect(status, url);

const handlePermissionError = async res => {
  res.status(401).json({
    success: false,
    status: 401,
    message: 'You do not have a permission to perform this action.',
    data: {}
  });
};

const validateRequest = async (req, res, options) => {
  // Handle validation error if the request is not valid
  const validationResponse = handleValidationError(req, res);
  if (validationResponse !== null) {
    return validationResponse;
  }

  if (options.permissionKey) {
    const validationPermission = await handlePermissionError(req, res, options.permissionKey);
    if (validationPermission !== null) {
      return validationPermission;
    }
  }

  return null;
};

module.exports = {
  handleValidationError,
  handleCustomValidationError,
  handleSuccess,
  handleNotFound,
  handleForbidden,
  handleRedirect,
  handleInternalError,
  validateRequest
};
