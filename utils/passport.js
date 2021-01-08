const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const UserService = require('../services/users');
const config = require('../config');

const init = () => {
  passport.use(new KakaoStrategy({
      clientID: config.oauth.kakao.clientId,
      clientSecret: config.oauth.kakao.clientSecret,
      callbackURL: config.baseUrl + "/auth/kakao/callback"
    }, (accessToken, refreshToken, profile, done) => {
      const user = {
        userId: profile.provider + profile.id,
        providerId: profile.id,
        provider: profile.provider,
        name: profile.username,
        image: {
          url: profile._json.properties ? profile._json.properties.profile_image : "",
          thumbnail: profile._json.properties ? profile._json.properties.thumbnail_image : ""
        },
        email: profile._json.kakao_account.email,
        signUpDate: new Date(),
      };

      UserService.findOrUpsertUser(user)
        .then(user => {
          console.log('user=', user);
          done(null, user);
        })
        .catch(err => {
          console.error('err=', err);
          done(err)
        });
    })
  );

  // 인증후 사용자 정보를 세션에 저장
  passport.serializeUser(function (user, done) {
    console.log('[serializedUser] ', user.userId);
    // 두번째 파라미터가 req.session.passport.user에 저장됨
    done(null, user.userId);
  });

  // 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장됨
  // 매개변수 user: req.session.passport.user에 저장된 값
  passport.deserializeUser(function (userId, done) {
    console.log('[deserializeUser] ', userId);
    UserService.findUser(userId)
      .then(user => done(null, user))  // 여기의 user가 req.user가 됨
      .catch(err => done(err));
  });
};

module.exports = {
  init,
}
