const express = require('express');
const router = express.Router();
const Controller = require('../controllers/shows');
// const Auth = require('../middlewares/auth'); // TO-BE: 로그인 추가 시

// router.get('/', Auth.verifyToken, Controller.getUsers);
router.get('/', Controller.getAllShows);
// router.post('/search', Auth.verifyToken, Controller.getUsersByFilter);
module.exports = router;
