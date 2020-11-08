const UsersService = require('../services/users');
const authUtil = require('../utils/auth');

const signUp = (req, res, next) => {
  return UsersService.findAndAddUser(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err instanceof UsersService.AlreadyExistError) {
        res.sendStatus(409);
      } else {
        next(err)
      }
    });
}

const signIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  UsersService.findOneUser(email)
    .then(user => {
      console.log(user);
      if (authUtil.matchPasswords(password, user.password)) {
        const token = authUtil.generateToken({ userId: user._id });

        return res.json({
          accessToken: token,
          userId: user._id,
          nickName: user.nickName,
          email: user.email,
        })
      } else {
        return res.sendStatus(401);
      }
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
}

const signOut = (req, res ,next) => {
  res.clearCookie('access_token');
  res.removeHeader('x-access-token');
  return res.sendStatus(204);
}

module.exports = {
  signUp, signIn, signOut
};