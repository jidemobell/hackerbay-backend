process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect, assert } = chai;

chai.use(chaiHttp);


const app = require('../server');
const User = require('../models/user');

const testuser = {
  email: 'test@mocha.org',
  password: 'secure',
};
const document = require('./doc.json');
const patch = require('./patch.json');


describe('TEST microservice routes', () => {
  let token = '';

  it('should create a user', (done) => {
    User.deleteOne({ email: testuser.email });
    chai.request(app)
      .post('/signup')
      .send(testuser)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res).to.have.status(200);
        assert.equal('user created', res.body.message);
        done();
      });
  });

  it('should deny wrong user credentials', (done) => {
    chai.request(app)
      .post('/signin')
      .send({})
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res).to.have.status(400);
        done();
      });
  });


  it('should login a user', (done) => {
    chai.request(app)
      .post('/signin')
      .send({
        email: 'test@mocha.org',
        password: 'secure',
      })
      .end((err, res) => {
        const response = res.body;
        if (err) { return done(err); }
        expect(res).to.have.status(200);
        assert.equal(true, res.body.success);
        token = response.token;
        done();
      });
  });

  it('should get the restricted endpoint', (done) => {
    chai.request(app)
      .patch('/jsonpatch')
      .send({
        document,
        patch,
      })
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should respond with a status 200 on image download', (done) => {
    chai.request(app)
      .get('/thumbnail')
      .query({ url: 'https://www.google.com/images/srpr/logo3w.png' })
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res).to.have.status(200);
        done();
      });
  });
});
