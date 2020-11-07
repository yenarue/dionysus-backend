const _ = require('lodash');

const config = {};

config.development = {
  baseUrl: process.env.BASE_URL || 'http://localhost:8080',
  port: process.env.PORT || 8080,
  frontendBaseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
  dbUrl: process.env.MONGO_DB_URL,
  spreadsheets: {
    rawData: "https://docs.google.com/spreadsheets/d/11sRr9ejx7hAJcjgtUNeHHmeQCA50pUe5C6g6NY9Tni8"
  }
};

config.staging = _.cloneDeep(config.development);

config.production = _.cloneDeep(config.development);
config.production.spreadsheets.rawData = "https://docs.google.com/spreadsheets/d/11sRr9ejx7hAJcjgtUNeHHmeQCA50pUe5C6g6NY9Tni8";

config.test = {
  baseUrl: 'http://localhost:8081',
  port: 8081,
  frontendBaseUrl: '',
  dbUrl: process.env.MONGO_DB_URL,
  spreadsheets: {
    rawData: "https://docs.google.com/spreadsheets/d/11sRr9ejx7hAJcjgtUNeHHmeQCA50pUe5C6g6NY9Tni8"
  },
  testUser: {
    tempUserId: 'tempUserId',
    email: 'test@email.com',
    password: 'normalpw',
    nickName: '테스트유저',
    gender: 'etc',
    birthday: new Date("1991-11-04"),
    regions: ["문래", "강남", "수지"],
    signUpDate: new Date("2020-11-07"),
  }
};

module.exports = config[process.env.NODE_ENV];
