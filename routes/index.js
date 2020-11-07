const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
// const Auth = require('../middlewares/auth'); // TO-BE: 로그인 추가 시

// router.post('/search', Auth.verifyToken, Controller.getUsersByFilter);
// router.get('/', Auth.verifyToken, Controller.getUsers);

router.get('/', (req, res) => {
  res.send('Hello Dionysus Backend (' + process.env.NODE_ENV + ' v' +  require('../package.json').version +')');
});

router.put('/signup', AuthController.signUp);

module.exports = router;
