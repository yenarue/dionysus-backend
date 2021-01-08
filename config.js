const _ = require('lodash');

const config = {};

config.development = {
  baseUrl: process.env.BASE_URL || 'http://localhost:8080',
  port: process.env.PORT || 8080,
  frontendBaseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
  dbUrl: process.env.MONGO_DB_URL,
  spreadsheets: {
    rawData: "https://docs.google.com/spreadsheets/d/11sRr9ejx7hAJcjgtUNeHHmeQCA50pUe5C6g6NY9Tni8"
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  oauth: {
    kakao: {
      clientId: "8a5ab536a1eab9f4d3880740a4c6f172",
      clientSecret: "",
    }
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
    jwtSecretKey: "jwtSecretKey",
    jwt: {
      valid: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDQ4MzQ1NjgsImV4cCI6MTE2MDQ4MzQ1NjcsImlkIjoidGVzdGp3dCJ9.gAsj90WxTtMeZtxkuT9MqzYnIkIzqaDblIJkB25-LQc",
      expired: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDQ4MzQ1OTMsImV4cCI6MTYwNDgzNDU5NCwiaWQiOiJ0ZXN0and0MiJ9.LlB4p9rwNbk5-ehYE90HnQpnlj_FhTmxTEsirx6QYTY",
      invalid: "IamFake",
    }
  }
};

module.exports = config[process.env.NODE_ENV];
