const config = require('../config');
const UserService = require('../services/users');
const AuthUtil = require('../utils/auth');

/** start of Errors **/
class NotExistUserError extends Error {
  constructor(message, data) {
    super(message);
    this.name = this.constructor.name;
    this.data = data;
  }
}

/** end of Errors **/

const createErrorResponse = (userId, errCode, errMessage) => {
  return {
    userId: userId,
    errCode: errCode,
    errMessage: errMessage
  };
};

const verify = (token) => {
  if (!token) {
    return new Promise((resolve, reject) => {
      reject(createErrorResponse(undefined, 403, "Has no token"));
    });
  }

  return new Promise((resolve, reject) => {
    resolve(AuthUtil.veirfyToken(token));
  });
};

const verifyToken = (req, res, next) => {
  const onError = (reason) => {
    console.error('===verifyToken:onError', 'userId=', reason.userId, 'err=', reason.errCode, ':', reason.errMessage);
    console.error(reason);
    res.status(reason.errCode).json({
      success: false,
      message: reason.errMessage
    });
  };

  const onSuccess = (decoded) => {
    req.userId = decoded.userId;
    next();
  };

  verify(req.headers['x-access-token'])
    .then(onSuccess)
    .catch(onError);
};

const verifyTokenButAllowTempUser = (req, res, next) => {
  console.log('requestBody', req.body);
  console.log('requestHeader', req.headers);
  const token = req.headers['x-access-token'];
  const tempUserId = req.headers['x-id-token'];

  if (token && token !== 'undefined') {
    verifyToken(req, res, next);
    return;
  }

  if (tempUserId) {
    next();
  }
}

/** for passport **/
const ensureAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(401);
  }

  UserService.findUser(req.user.userId)
    .then(() => next())
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
  })
}

module.exports = {
  verifyToken,
  verifyTokenButAllowTempUser,
  ensureAuthenticated
};