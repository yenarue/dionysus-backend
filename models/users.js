const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  userId: String,
  provider: String,
  providerId: String,
  name: String,
  image: {
    url: String,
    thumbnail: String
  },
  email: String,
  password: String,
  nickName: String,
  gender: String,
  birthday: Date,
  regions: Array,
  signUpDate: Date,
});

module.exports = mongoose.model('users', schema);