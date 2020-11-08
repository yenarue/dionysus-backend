const bcrypt = require('bcryptjs');
const UserModel = require('../models/users');
const authUtil = require('../utils/auth');

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
        userInfo.password = authUtil.encryptPassword(userInfo.password);
        userInfo.signUpDate = new Date();
        return new UserModel(userInfo).save();
      }
    })
};

const findOneUser = (email) => {
  return UserModel.findOne({ email: email }, { userId: 1, password: 1, email: 1, nickName: 1 });
}

const getUser = (userId) => {
  return UserModel.findOne({ _id: userId }, { userId: 1, password: 1, email: 1, nickName: 1 });
}

module.exports = {
  AlreadyExistError,
  findAndAddUser,
  findOneUser,
  getUser,
}