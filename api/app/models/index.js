const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const { logger } = require('../helpers/logger');
const moduleLogger = logger.child({ module: 'db' });

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

if (moduleLogger.debug()) {
  moduleLogger.debug('DBCONFIG', dbConfig);
} else {
  const data = {
    name: dbConfig.DB,
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    logging: dbConfig.LOGGING
  };
  moduleLogger.info('DBCONFIG', data);
}

/////////////////////////////////////////////////////////////////
///  Below here DB Motels are setup and relations are set  //////
/////////////////////////////////////////////////////////////////

const ShiftModel = require('./shift.model.js');
const jobModel = require('./job.model.js');
const UserModel = require('./user.model.js');

// Define models
const Shift = ShiftModel(sequelize, Sequelize);
const Job = jobModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

//Define relations
Job.hasMany(Shift, { as: 'shifts' });
Shift.belongsTo(Job);

User.hasMany(Shift, { as: 'shifts' });
Shift.belongsTo(User);

module.exports = {
  sequelize,
  Sequelize,
  Shift,
  Job,
  User
};
