const { logger } = require('./logger');
const { createShift } = require('../helpers/shift.helper');
const { createUser } = require('../helpers/user.helper');
const { createLocation } = require('../helpers/location.helper');
const { attachShiftToUser } = require('../helpers/shiftuser.helper');
const moduleLogger = logger.child({ module: 'util' });
const moment = require('moment');

const getIPAddress = req => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

const { faker } = require('@faker-js/faker');

async function fillDB(db) {
  if (process.env.NODE_ENV !== 'development') return;

  moduleLogger.debug('Filling database with test data');
  createUser('coordinator', 'coordinator', 'test', 'coord@test.de', '0123456789', 'coordinator', 'user');
  createUser('guest', 'guest', 'test', 'guest@test.de', '0123456789', 'guest', 'user');
  createUser('admin', 'admin', 'test', 'admin@test.de', '0123456789', 'admin', 'admin');
  for (let i = 0; i < 50; i++) {
    createUser(
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.password(),
      faker.internet.email(),
      faker.phone.phoneNumber(),
      'guest',
      'user'
    );
  }

  createLocation('bar1', '79ac4a7a-4634-4b6e-b7e2-18f5aa505d7a');
  createLocation('bar2', '694b3b2d-6993-4081-b372-f57f423b0d75');
  createLocation('bar3', '638a52a4-6423-4c13-9d38-40fccee0d5c9');
  createLocation('bar4', '809770c6-969e-4f0f-aa0e-ec58ef7672f2');
  createLocation('bar5', 'c4c23af8-4d48-4ffd-8ed3-791f2192bd73');

  let current = moment(moment.now()).format('YYYY-MM-DD HH:mm:ss');
  for (let i = 0; i < 50; i++) {
    createShift('bar1', current, current, 'normal');
  }
  // wait for shifts are created
  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(5000);

  attachShiftToUser(db, 1, 1);
  moduleLogger.debug('database filled');
}

module.exports = { getIPAddress, fillDB };
