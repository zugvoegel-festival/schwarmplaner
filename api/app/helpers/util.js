const { createShift } = require('../helpers/shift.helper');
const { createUser } = require('../helpers/user.helper');
const { createjob } = require('../helpers/job.helper');
const fs = require('fs');
const parse = require('csv-parser');
const { logger } = require('./logger');
const moduleLogger = logger.child({ module: 'util' });
const moment = require('moment');

const getIPAddress = req => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

const { faker } = require('@faker-js/faker');

async function fillDB() {
  if (process.env.NODE_ENV !== 'development') return;

  moduleLogger.debug('Filling database with test data');

  fs.createReadStream('app/jobs.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', function (csvrow) {
      createjob(csvrow.Ort, faker.datatype.uuid());
    });

  fs.createReadStream('app/shifts.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', function (csvrow) {
      let type;

      if (csvrow.typ === 'Koordination') {
        type = 'coordinator';
      }

      if (csvrow.typ === 'Schicht') {
        type = 'normal';
      }
      createShift(
        csvrow.ort,
        moment(csvrow.start, 'HH.MM.DD hh:mm:ss'),
        moment(csvrow.ende, 'HH.MM.DD hh:mm:ss'),
        type
      );
    });

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

  // wait for shifts are created
  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(5000);

  //attachShiftToUser(db, 1, 1);
  moduleLogger.debug('database filled');
}

module.exports = { getIPAddress, fillDB };
