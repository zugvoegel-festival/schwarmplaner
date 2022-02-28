const createUser = (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: 'Email can not be empty!'
    });
    return false;
  }
  if (!req.body.name) {
    res.status(400).send({
      message: 'Name can not be empty!'
    });
    return false;
  }
  return true;
};

module.exports = { createUser };
