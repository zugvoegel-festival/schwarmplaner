const db = require('../models');
const { logger } = require('./logger');
const moduleLogger = logger.child({ module: 'shifthelper' });

exports.createShift = (locationName, start, end, type) => {
  var newShift = {
    start: start,
    end: end,
    type: type
  };

  db.Location.findOrCreate({ where: { name: locationName } })
    .then(location => {
      db.Shift.findOrCreate({ where: newShift })
        .then(([shift, created]) => {
          if (created) {
            shift
              .setLocation(location[0])
              .then(data => {
                moduleLogger.debug('created shift ' + shift.id);
              })
              .catch(error => {
                moduleLogger.debug(error);
              });
          } else {
            moduleLogger.debug('shift already created ' + shift.id);
          }
        })

        .catch(error => {
          moduleLogger.debug(error);
        });
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};
