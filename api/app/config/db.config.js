module.exports = {
  HOST: process.env.ORGA_DB_HOST,
  USER: process.env.ORGA_DB_USER,
  PASSWORD: process.env.ORGA_DB_PASSWORD,
  DB: process.env.ORGA_DB_NAME,
  PORT: process.env.ORGA_DB_PORT,
  LOGGING: process.env.CHECK_DB_LOGGING || false,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
