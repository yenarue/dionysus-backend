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

const findUserByEmail = (email) => {
  return UserModel.findOne({ email: email }, { userId: 1, password: 1, email: 1, nickName: 1 });
}

const findUser = (userId) => {
  return UserModel.findOne({ userId: userId });
}

const getUser = (userId) => {
  return UserModel.findOne({ userId: userId }, { userId: 1, password: 1, email: 1, nickName: 1 });
}

const findOrUpsertUser = (user) => {
  return UserModel.findOneAndUpdate(
    { userId: user.userId },
    { $set: user },
    { upsert: true }
    )
}

module.exports = {
  AlreadyExistError,
  findAndAddUser,
  findUserByEmail,
  findUser,
  findOrUpsertUser,
  getUser,
}