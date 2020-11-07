const chai = require('chai');
const should = chai.should();
const server = require('../server');
const request = require('supertest').agent(server);
const UserModel = require('../models/users');

describe('Users', () => {
  describe('PUT /user/signup', () => {
    it.skip('회원가입', done => {
      const requestData = {
        tempUserId: 'tempUserId',
        email: 'test@email.com',
        password: 'normalpw',
        nickName: '테스트유저',
        gender: 'etc',
        birthday: new Date("1991-11-04"),
        regions: ["문래", "강남", "수지"],
      }

      request.put('/user/signup')
        // .set('Authorization', config.accessToken.valid)
        .send(requestData)
        .expect(200)
        .then(res => {
          return UserModel.find({email: requestData.email});
        }).then(user => {
          user.email.should.be.eql('test@email.com');
          user.nickName.should.be.eql('테스트유저');
          user.signUpDate.should.be.eql('테스트유저'); // 시논 넣어야 함. 시간 없움
          done();
        })
        .catch(err => done(err));
    });
  });

});
