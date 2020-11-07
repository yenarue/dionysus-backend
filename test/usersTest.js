const chai = require('chai');
const should = chai.should();
const server = require('../server');
const request = require('supertest').agent(server);

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
        signUpDate: new Date("2020-11-07"),
      }

      request.put('/user/signup')
        // .set('Authorization', config.accessToken.valid)
        .send(requestData)
        .expect(200)
        .then(res => {
          console.log(res.body.data.length);

          res.body.headers[0].should.be.eql('고유b');
          res.body.data[0]['고유b'].should.be.eql('b00000001');
          done();
        })
        .catch(err => done(err));
    });
  });

});
