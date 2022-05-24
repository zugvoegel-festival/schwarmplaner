const { logger } = require('./logger');
const { createShifts } = require('../helpers/shift.helper');
const { createUser } = require('../helpers/user.helper');
const { createLocation } = require('../helpers/location.helper');
const { attachShftToUser } = require('../helpers/shiftuser.helper');
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
  createLocation('awareness', '694b3b2d-6993-4081-b372-f57f423b0d75');
  createLocation('müll', '638a52a4-6423-4c13-9d38-40fccee0d5c9');
  createLocation('awareness', '809770c6-969e-4f0f-aa0e-ec58ef7672f2');
  createLocation('küche', 'c4c23af8-4d48-4ffd-8ed3-791f2192bd73');

  let current = moment(moment.now()).format('YYYY-MM-DD HH:mm:ss');

  // create shifts from start time
  // thursday 4, friday  5. saturday 6,sunnday 7
  // on each  day:
  //    4 normal,
  //    3 coordinator

  let start = moment().hour(8).minute(0).second(0);

  createShifts('bar1', start, 4, 'normal', 4);
  createShifts('bar1', start, 5, 'normal', 4);
  createShifts('bar1', start, 6, 'normal', 4);
  createShifts('bar1', start, 7, 'normal', 4);

  createShifts('bar1', start, 4, 'coordinator', 2);
  createShifts('bar1', start, 5, 'coordinator', 2);
  createShifts('bar1', start, 6, 'coordinator', 2);
  createShifts('bar1', start, 7, 'coordinator', 2);

  createShifts('bar1', start, 4, 'ticket', 1);
  createShifts('bar1', start, 5, 'ticket', 1);
  createShifts('bar1', start, 6, 'ticket', 1);
  createShifts('bar1', start, 7, 'ticket', 1);

  createShifts('awareness', start, 4, 'normal', 4);
  createShifts('awareness', start, 5, 'normal', 4);
  createShifts('awareness', start, 6, 'normal', 4);
  createShifts('awareness', start, 7, 'normal', 4);

  createShifts('awareness', start, 4, 'coordinator', 2);
  createShifts('awareness', start, 5, 'coordinator', 2);
  createShifts('awareness', start, 6, 'coordinator', 2);
  createShifts('awareness', start, 7, 'coordinator', 2);

  createShifts('awareness', start, 4, 'ticket', 1);
  createShifts('awareness', start, 5, 'ticket', 1);
  createShifts('awareness', start, 6, 'ticket', 1);
  createShifts('awareness', start, 7, 'ticket', 1);

  createShifts('müll', start, 4, 'short', 8);
  createShifts('müll', start, 5, 'short', 8);
  createShifts('müll', start, 6, 'short', 8);
  createShifts('müll', start, 7, 'short', 8);

  createShifts('awareness', start, 4, 'normal', 4);
  createShifts('awareness', start, 5, 'normal', 4);
  createShifts('awareness', start, 6, 'normal', 4);
  createShifts('awareness', start, 7, 'normal', 4);

  createShifts('küche', start, 4, 'normal', 4);
  createShifts('küche', start, 5, 'normal', 4);
  createShifts('küche', start, 6, 'normal', 4);
  createShifts('küche', start, 7, 'normal', 4);

  createShifts('küche', start, 4, 'coordinator', 2);
  createShifts('küche', start, 5, 'coordinator', 2);
  createShifts('küche', start, 6, 'coordinator', 2);
  createShifts('küche', start, 7, 'coordinator', 2);

  // wait for shifts are created
  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(5000);

  //attachShiftToUser(db, 1, 1);
  moduleLogger.debug('database filled');
}

module.exports = { getIPAddress, fillDB };
