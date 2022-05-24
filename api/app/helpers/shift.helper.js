const db = require('../models');
const { logger } = require('./logger');
const moduleLogger = logger.child({ module: 'shifthelper' });
const moment = require('moment');
exports.createShift = (locationName, startMoment, endMoment, type) => {
  var newShift = {
    start: startMoment.format('YYYY-MM-DD HH:mm:ss'),
    end: endMoment.format('YYYY-MM-DD HH:mm:ss'),
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
exports.createShifts = (locationName, startMoment, day, type, amount) => {
  let start = startMoment.day(day);
  let duration;
  if (type === 'short') {
    duration = moment.duration(2, 'hours');
  }
  if (type === 'normal') {
    duration = moment.duration(4, 'hours');
  }
  if (type === 'coordinator') {
    duration = moment.duration(6, 'hours');
  }
  if (type === 'ticket') {
    duration = moment.duration(8, 'hours');
  }

  for (let i = 0; i < amount; i++) {
    let end = start.add(duration);
    this.createShift(locationName, start, end, type);
    start = end;
  }
};
