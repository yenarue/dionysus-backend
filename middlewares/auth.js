const JWT = require('jsonwebtoken');
const config = require('../config');
const UserService = require('../services/users');
const AuthUtil = require('../utils/auth');

class NotExistUserError extends Error {
  constructor(message, data) {
    super(message);
    this.name = this.constructor.name;
    this.data = data;
  }
}

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
    console.log('???????????')
    resolve(AuthUtil.veirfyToken(token));
    // AuthUtil.veirfyToken(token)
    //   .then(decoded => {
    //     console.log(decoded)
    //     return UserService.getUser(decoded.userId)
    //       .then(user => {
    //         if (!user) {
    //           throw new NotExistUserError('The user does NOT exist', decoded);
    //         }
    //
    //         return Promise.resolve(user);
    //       })
    //   })
    //   .then(user => {
    //     console.log(user)
    //     resolve(user._id);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //
    //     if (err instanceof JWT.TokenExpiredError) {
    //       reject(createErrorResponse(undefined, 401, err.message));
    //     } else if (err instanceof JWT.JsonWebTokenError || err instanceof JWT.NotBeforeError) {
    //       reject(createErrorResponse(undefined, 403, err.message));
    //     } else if (err instanceof NotExistUserError) {
    //       reject(createErrorResponse(err.data.userId, 403, 'The user does NOT exist'))
    //     } else {
    //       reject(createErrorResponse(undefined, 500, 'Internal Server Error'));
    //     }
    //   });
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

module.exports = {
  verifyToken,
  verifyTokenButAllowTempUser
};