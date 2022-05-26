const db = require('../models');
const { logger } = require('./logger');
const moduleLogger = logger.child({ module: 'shifthelper' });
const moment = require('moment');
exports.createShift = (jobName, startMoment, endMoment, type) => {
  var newShift = {
    start: startMoment.format('YYYY-MM-DD HH:mm:ss'),
    end: endMoment.format('YYYY-MM-DD HH:mm:ss'),
    type: type
  };

  db.Job.findOrCreate({ where: { name: jobName } })
    .then(([job, cerated]) => {
      db.Shift.create(newShift)
        .then(shift => {
          shift
            .setJob(job)
            .then(data => {
              moduleLogger.debug('created shift ' + shift.id);
            })
            .catch(error => {
              moduleLogger.error(error);
            });
        })

        .catch(error => {
          moduleLogger.error(error);
        });
    })
    .catch(error => {
      moduleLogger.error(error);
    });
};
exports.createShifts = (jobName, startMoment, day, type, amount) => {
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
    let end = moment(start);
    end.add(duration);
    this.createShift(jobName, start, end, type);
    start = end;
  }
};
exports.addUserToShift = (shiftId, userId) => {
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
