const { logger } = require('./logger');
const uuid = require('uuid'); // ES5
const moduleLogger = logger.child({ module: 'util' });
const moment = require('moment');

const getIPAddress = req => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

const { faker } = require('@faker-js/faker');
const { Shift } = require('../models');

const addUser = (db, surname, lastname, password, email, phone, role, type) => {
  var newUser = {
    surname: surname,
    lastname: lastname,
    password: password,
    email: email,
    phone: phone,
    role: role,
    type: type
  };

  db.User.findOrCreate({ where: newUser })
    .then(([user, created]) => {
      moduleLogger.debug('created User ' + user.id + ' ' + user.surname);
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};

const addShift = (db, locationName, start, end, type) => {
  var newShift = {
    start: start,
    end: end,
    type: type
  };

  db.Location.findOrCreate({ where: { name: locationName } })
    .then(location => {
      db.Shift.findOrCreate({ where: newShift })
        .then(shift => {
          shift[0]
            .setLocation(location[0])
            .then(data => {
              //moduleLogger.debug(data);
            })
            .catch(error => {
              moduleLogger.debug(error);
            });
        })

        .catch(error => {
          moduleLogger.debug(error);
        });
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};

const addLocation = (db, name, slug) => {
  var newLocation = {
    name: name,
    slug: slug
  };

  db.Location.findOrCreate({ where: newLocation })
    .then(([location, created]) => {
      //moduleLogger.debug(location, created);
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};

const attachShiftToUser = (db, shiftId, userId) => {
  db.Shift.findByPk(shiftId)
    .then(shift => {
      shift
        .addUser(userId)
        .then(data => {
          moduleLogger.debug(data);
        })
        .catch(error => {
          moduleLogger.debug(error);
        });
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};

async function fillDB(db) {
  addUser(db, 'coordinator', 'coordinator', 'test', 'coord@test.de', '0123456789', 'coordinator', 'user');
  addUser(db, 'guest', 'guest', 'test', 'guest@test.de', '0123456789', 'guest', 'user');
  addUser(db, 'admin', 'admin', 'test', 'admin@test.de', '0123456789', 'admin', 'admin');
  for (let i = 0; i < 50; i++) {
    addUser(
      db,
      faker.name.firstName(),
      faker.name.lastName(),
      faker.internet.password(),
      faker.internet.email(),
      faker.phone.phoneNumber(),
      'guest',
      'user'
    );
  }

  addLocation(db, 'bar1', '79ac4a7a-4634-4b6e-b7e2-18f5aa505d7a');
  addLocation(db, 'bar2', '694b3b2d-6993-4081-b372-f57f423b0d75');
  addLocation(db, 'bar3', '638a52a4-6423-4c13-9d38-40fccee0d5c9');
  addLocation(db, 'bar4', '809770c6-969e-4f0f-aa0e-ec58ef7672f2');
  addLocation(db, 'bar5', 'c4c23af8-4d48-4ffd-8ed3-791f2192bd73');

  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');
  addShift(db, 'bar1', moment.now(), moment.now(), 'normal');

  // wait for shifts are created
  let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(5000);

  attachShiftToUser(db, 1, 1);
}

module.exports = { getIPAddress, fillDB };
