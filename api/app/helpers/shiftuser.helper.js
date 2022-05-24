const db = require('../models');
const { logger } = require('./logger');
const moduleLogger = logger.child({ module: 'shiftuserhelper' });
exports.attachShiftToUser = (shiftId, userId) => {
  db.Shift.findByPk(shiftId)
    .then(shift => {
      shift
        .addUser(userId)
        .then(data => {
          moduleLogger.debug('attached shift ' + shiftId + ' to  user ' + userId);
        })
        .catch(error => {
          moduleLogger.debug(error);
        });
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};
