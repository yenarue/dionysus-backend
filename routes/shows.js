const express = require('express');
const router = express.Router();
const Controller = require('../controllers/shows');
// const Auth = require('../middlewares/auth'); // TO-BE: 로그인 추가 시

// router.post('/search', Auth.verifyToken, Controller.getUsersByFilter);
// router.get('/', Auth.verifyToken, Controller.getUsers);

router.get('/', Controller.getAllShows);
router.put('/heart/:showId', Controller.putHeart);
router.post('/hearts', Controller.postHearts);
router.delete('/heart/:showId', Controller.deleteHeart);

module.exports = router;
