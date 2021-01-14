const express = require('express');
const router = express.Router();
const config = require('../config');
const AuthMiddleware = require('../middlewares/auth');
const AuthController = require('../controllers/auth');

// router.post('/search', Auth.verifyToken, Controller.getUsersByFilter);
// router.get('/', Auth.verifyToken, Controller.getUsers);

router.get('/', (req, res) => {
  res.send('Hello Dionysus Backend (' + process.env.NODE_ENV + ' v' +  require('../package.json').version +')');
});

/** for passport **/
router.get('/auth/check', AuthMiddleware.ensureAuthenticated, (req, res) => {
  console.log(req.user);
  res.json(req.user);
})
router.get('/auth/kakao', AuthController.kakaoAuthenticate);
router.get('/auth/kakao/callback', AuthController.kakaoAuthenticateCallback);
router.get('/auth/success', (req, res) => {
  console.log('auth success')
  res.redirect(config.frontendBaseUrl);
});
router.get('/auth/fail', (req, res) => {
  console.error('auth fail');
  res.redirect(config.frontendBaseUrl);
});
router.get('/auth/signup', (req, res) => {
  console.log('auth signup')
  res.redirect(config.frontendBaseUrl + '/signup');
});
router.get('/auth/logout', AuthMiddleware.ensureAuthenticated, AuthController.logout);


module.exports = router;
