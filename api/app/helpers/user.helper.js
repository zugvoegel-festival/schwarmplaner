const db = require('../models');
const { logger } = require('./logger');
const moduleLogger = logger.child({ module: 'userHelper' });

exports.createUser = (surname, lastname, password, email, phone, role, type) => {
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
      if (created) {
        moduleLogger.debug('created User ' + user.id + ' ' + user.surname);
      } else {
        moduleLogger.debug('User already existing ' + user.id + ' ' + user.surname);
      }
    })
    .catch(error => {
      moduleLogger.debug(error);
    });
};
