const getIPAddress = req => req.headers['x-forwarded-for'] || req.connection.remoteAddress;

module.exports = { getIPAddress };
