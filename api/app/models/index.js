const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const AppointmentModel = require("./appointment.model.js");
const CalendarModel = require("./calendar.model.js");
const UserModel = require("./user.model.js");

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
    idle: dbConfig.pool.idle,
  },
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

const Appointment = AppointmentModel(sequelize, Sequelize);
const Calendar = CalendarModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Calendar.hasMany(Appointment, { as: "appointment" });

Appointment.belongsTo(Calendar, {
  foreignKey: "calendarId",
  as: "calendar",
});

Calendar.hasMany(User, { as: "user" });

User.belongsTo(Calendar, {
  foreignKey: "calendarId",
  as: "calendar",
});

module.exports = {
  sequelize,
  Sequelize,
  Appointment,
  Calendar,
  User,
};
