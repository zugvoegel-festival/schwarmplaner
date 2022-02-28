require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bunyanMiddleware = require('bunyan-middleware');
const { writeFileSync } = require('fs');
const sequelizeErd = require('sequelize-erd');
const { logger } = require('./helpers/logger');

const moduleLogger = logger.child({ module: 'server' });

const app = express();

const port = process.env.ORGA_API_PORT || 3000;

app.set('trust proxy', true);
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(
  bunyanMiddleware({
    headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'reqId',
    obscureHeaders: ['authorization'],
    logger,
    additionalRequestFinishData: (_req, _res) => ({})
  })
);

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

const db = require('./models');
const { handleSuccess, handleNotFound } = require('./helpers/response');

db.sequelize
  .sync({ alter: true })
  .then(data => {
    moduleLogger.info('Database is reachable', data);
  })
  .catch(err => {
    moduleLogger.error('Error syncing sequelize', err);
  });
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
// });

require('./routes/appointment.routes')(app);
require('./routes/calendar.routes')(app);
require('./routes/user.routes')(app);

// TODO:  only in dev env
sequelizeErd({ source: db.sequelize }).then(res => {
  writeFileSync('./db.svg', res);
}); // sequelizeErd() returns a Promise

app.get('/', (_req, res) => {
  handleSuccess(res, 'API is up and running');
});

// catch 404 and forward to error handler
app.get('/*', (_req, res) => {
  handleNotFound(res, 'Page not found');
});
const server = app.listen(port);

moduleLogger.info(`API server started on: ${port}`);

module.exports = { app, server };
