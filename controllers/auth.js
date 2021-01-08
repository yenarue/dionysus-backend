const passport = require('passport');

const logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
}

/** for kakao **/
const kakaoAuthenticate = passport.authenticate("kakao");
const kakaoAuthenticateCallback = passport.authenticate("kakao", {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/fail'
});

module.exports = {
  logout,
  kakaoAuthenticate,
  kakaoAuthenticateCallback
};