const passport = require('passport');

const logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
}

/** for kakao **/
const kakaoAuthenticate = passport.authenticate("kakao");
const kakaoAuthenticateCallback = (req, res, next) => {
  passport.authenticate("kakao", function(err, user, info) {
    if (err) { return next(err); }

    if (!user.signUpDate) {
      console.log('signUpDate is undefined');
      return res.redirect('/auth/signup');
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
  kakaoAuthenticateCallback
};