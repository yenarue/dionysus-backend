const passport = require('passport');
const UserService = require('../services/users');

const logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
}

/** User Controller 구현시 옮겨가자 **/
const signUpUser = (req, res) => {
  UserService.updateUser({
    ...req.body,
    signUpDate: new Date(),
  })
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
}

/** for kakao **/
const kakaoAuthenticate = passport.authenticate("kakao");
const kakaoAuthenticateCallback = (req, res, next) => {
  passport.authenticate("kakao", function(err, user, info) {
    if (err) { return next(err); }

    if (!user.signUpDate) {
      console.log('signUpDate is undefined');
      return res.redirect('/auth/signup?email=' + user.email);
    }

    req.logIn(user, err => {
      if (err) { return next(err); }
      return res.redirect('/auth/success');
    });
  })(req, res, next);
}

module.exports = {
  logout,
  kakaoAuthenticate,
  kakaoAuthenticateCallback,
  signUpUser
};