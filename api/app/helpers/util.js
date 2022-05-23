const { logger } = require('./logger');

const moduleLogger = logger.child({ module: 'util' });

const getIPAddress = req => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

const { faker } = require('@faker-js/faker');

const addUser = (db, newUser) => {
 db.User.findOrCreate({ where: newUser })
      .then(([user, created]) => {
        moduleLogger.debug(user, created);
      })
      .catch(error => {
          moduleLogger.debug(error);
      });
}
const fillDB = db => {

  // Fill Fake-Database
    var newUser = {
      surname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      role: 'guest',
      type: 'user'
    };

  addUser(db, newUser)
    // Fill Fake-Database
    newUser = {
      surname: "guest",
      lastname: "guest",
      password: "test",
      email: "guest@test.de",
      phone: "guest",
      role: 'guest',
      type: 'user'
    };
  addUser(db, newUser)
    newUser = {
      surname: "admin",
      lastname: "admin",
      password: "test",
      email: "admin@test.de",
      phone: "admin",
      role: 'admin',
      type: 'user'
    };
  addUser(db, newUser)
};


module.exports = { getIPAddress, fillDB };
