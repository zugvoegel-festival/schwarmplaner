const db = require('../models');
const { logger } = require('./logger');
const moduleLogger = logger.child({ module: 'locationHelper' });

exports.createLocation = (name, slug) => {
  var newLocation = {
    name: name,
    slug: slug
  };

  db.Location.findOrCreate({ where: newLocation })
    .then(([location, created]) => {
      moduleLogger.debug('location ' + location.name + ' created');
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};
