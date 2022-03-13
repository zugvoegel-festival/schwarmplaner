const jwt = require('jsonwebtoken');
const { logger } = require('./logger');

const moduleLogger = logger.child({ module: 'authentication' });
const secretKey = process.env.SCHWARM_JWT_SECRET_KEY;
const expiresIn = `${process.env.SCHWARM_JWT_EXPIRES_IN_HOURS}h`;

const tokenGenerator = data => {
  moduleLogger.debug('generating new token', { expiresIn });
  return jwt.sign(data, secretKey, {
    algorithm: 'HS256',
    expiresIn
  });
};

module.exports = {
  tokenGenerator
};
