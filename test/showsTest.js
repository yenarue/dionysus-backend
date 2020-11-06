const chai = require('chai');
const should = chai.should();
const server = require('../server');
const request = require('supertest').agent(server);
const config = require('../config');

describe('Shows', () => {

  describe('GET /shows', () => {
    it('일단 실행하기', done => {
      request.get('/shows')
        // .set('Authorization', config.accessToken.valid)
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

  describe('PUT /shows/heart', () => {
  });

  describe('DELETE /shows/heart', () => {
  });

  describe('GET /shows/hearts', () => {
  });
})