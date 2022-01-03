const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const userFakeId = mongoose.Types.ObjectId();
const userFake = {
  _id: userFakeId,
  name: 'Minh Bao',
  email: 'minhtran21301@gmail.com',
  password: 'hello1234',
  tokens: [
    {
      token: jwt.sign({ _id: userFakeId }, process.env.JWT_SECRET),
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userFake).save();
};

module.exports = {
  userFakeId,
  userFake,
  setupDatabase,
};
