const chai = require('chai');
const should = chai.should();
const server = require('../server');
const request = require('supertest').agent(server);
const config = require('../config');
const HeartsModel = require('../models/hearts');

describe('Shows', () => {

  describe('GET /shows', () => {
    it('전체 목록 가져오기', done => {
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

    it.skip('페이징 처리하여 목록 가져오기', done => {
      request.get('/shows?offset=0&limit=100')
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

  describe('PUT /shows/heart/:showId', () => {
    const requestData = {
        showId: "b00000001",
        authType: 'temp',
        userId: "user1"
    };

    beforeEach(done => {
      HeartsModel.create()
        .then(() => done())
        .catch(err => done(err));
    })

    it('호감도 정보 저장하기', done => {
      request.put('/shows/heart/b00000001')
        .send(requestData)
        // .set('Authorization', config.accessToken.valid)
        .expect(200)
        .then(res => {
          return HeartsModel.find({})
        })
        .then(hearts => {
          hearts.length.should.be.eql(1);
          hearts[0].showId.should.be.eql("b00000001");
          hearts[0].userId.should.be.eql("user1");

          done();
        })
        .catch(err => done(err));
    });

    afterEach(done => {
      HeartsModel.remove({})
        .then(() => done())
        .catch(err => done(err));
    });
  });

  describe('POST /shows/hearts', () => {
    beforeEach(done => {
      HeartsModel.create()
        .then(() => done())
        .catch(err => done(err));
    })

    it('[임시 유저] 호감도 정보 여러개 저장하기', done => {
      const requestData = {
        authType: 'temp',
        userId: 'tempUserId',
        showIds: ["b00000001", "b00000002", "b00000001", "b00000003"],
      };

      request.post('/shows/hearts')
        // .set('Authorization', config.accessToken.valid)
        .send(requestData)
        .expect(200)
        .then(res => {
          return HeartsModel.find({})
        })
        .then(hearts => {
          hearts.length.should.be.eql(4);
          hearts[0].showId.should.be.eql("b00000001");
          hearts[0].userId.should.be.eql("tempUserId");
          hearts[1].showId.should.be.eql("b00000002");
          hearts[1].userId.should.be.eql("tempUserId");
          hearts[3].showId.should.be.eql("b00000003");
          hearts[3].userId.should.be.eql("tempUserId");

          done();
        })
        .catch(err => done(err));
    });

    it('[정식 유저] 호감도 정보 여러개 저장하기', done => {
      const requestData = {
        showIds: ["b00000001", "b00000002", "b00000001", "b00000003"],
      };

      request.post('/shows/hearts')
        .set('Authorization', config.accessToken.valid)
        .send(requestData)
        .expect(200)
        .then(res => {
          return HeartsModel.find({})
        })
        .then(hearts => {
          hearts.length.should.be.eql(4);
          hearts[0].showId.should.be.eql("b00000001");
          hearts[0].userId.should.be.eql("testUserId");
          hearts[1].showId.should.be.eql("b00000002");
          hearts[1].userId.should.be.eql("testUserId");
          hearts[3].showId.should.be.eql("b00000003");
          hearts[3].userId.should.be.eql("testUserId");

          done();
        })
        .catch(err => done(err));
    });


    afterEach(done => {
      HeartsModel.remove({})
        .then(() => done())
        .catch(err => done(err));
    });
  });

  describe('DELETE /shows/heart/:showId', () => {

    beforeEach(done => {
      HeartsModel.create([    {
        showId: "b00000001",
        userId: "user1"
      },
        {
          showId: "b00000002",
          userId: "user1"
        },
        {
          showId: "b00000001",
          userId: "user2"
        },
        {
          showId: "b00000003",
          userId: "user10"
        }])
        .then(() => done())
        .catch(err => done(err));
    })

    it("호감도 삭제하기", done => {
      const requestData = {
        showId: "b00000001",
        userId: "user1"
      };

      request.delete('/shows/heart/b00000001')
        // .set('Authorization', config.accessToken.valid)
        .send(requestData)
        .expect(200)
        .then(res => {
          return HeartsModel.find({})
        })
        .then(hearts => {
          hearts.length.should.be.eql(3);

          hearts[0].showId.should.be.eql("b00000002");
          hearts[0].userId.should.be.eql("user1");
          hearts[1].showId.should.be.eql("b00000001");
          hearts[1].userId.should.be.eql("user2");
          hearts[2].showId.should.be.eql("b00000003");
          hearts[2].userId.should.be.eql("user10");

          done();
        })
        .catch(err => done(err));
    });

    afterEach(done => {
      HeartsModel.remove({})
        .then(() => done())
        .catch(err => done(err));
    });
  });

  describe('GET /shows/hearts', () => {
  });
})