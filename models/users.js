const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  userId: String,
  email: String,
  password: String,
  nickName: String,
  gender: String,
  birthday: Date,
  regions: Array,
  signUpDate: Date,

  // 임시 필드
  tempUserId: String,
});

module.exports = mongoose.model('users', schema);