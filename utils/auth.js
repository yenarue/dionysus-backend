const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const AUTH_SALT_ROUNDS = 10;
const JWT_SALT_ROUNDS = 10;

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, AUTH_SALT_ROUNDS);
}

const matchPasswords = (inputPassword, realPassword) => {
  return bcrypt.compareSync(inputPassword, realPassword);
}

const generateToken = (tokenData) => {
  return JWT.sign(tokenData, config.jwtSecretKey, {
    expiresIn: '1d'
  });
}

const veirfyToken = (token) => {
  return JWT.verify(token, config.jwtSecretKey);
}

module.exports = {
  encryptPassword,
  matchPasswords,
  generateToken,
  veirfyToken,
};