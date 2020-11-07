const bcrypt = require('bcryptjs');
const UserModel = require('../models/users');

const AUTH_SALT_ROUNDS = 10;

class AlreadyExistError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const findAndAddUser = (userInfo) => {
  console.log(userInfo)

  return UserModel.findOne({ email: userInfo.email })
    .then(user => {
      if (user) {
        throw new AlreadyExistError();
      } else {
        userInfo.password = bcrypt.hashSync(userInfo.password, AUTH_SALT_ROUNDS);
        userInfo.signUpDate = new Date();
        return new UserModel(userInfo).save();
      }
    })
};

const logout = (req, res) => {
  res.clearCookie('access_token');
  res.removeHeader('Authorization');
  return res.sendStatus(204);
}

module.exports = {
  AlreadyExistError,
  findAndAddUser
}