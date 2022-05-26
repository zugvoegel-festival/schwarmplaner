const db = require('../models');
const { logger } = require('./logger');
const moduleLogger = logger.child({ module: 'jobHelper' });

exports.createjob = (name, slug) => {
  var newjob = {
    name: name,
    slug: slug
  };

  db.Job.findOrCreate({ where: newjob })
    .then(([job, created]) => {
      moduleLogger.debug('job ' + job.name + ' created');
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};
