process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect, assert } = chai;

chai.use(chaiHttp);


const app = require('../server');
const User = require('../models/user');

const testuser = {
  email: 'test@mocha.org',
  password: 'secure',
};

beforeEach((done) => {
  User.deleteOne({ email: testuser.email }, () => done());
});


describe('TEST microservice routes', () => {
  it('should create a user', (done) => {
    chai.request(app)
      .post('/signup')
      .send(testuser)
      .end((err, res) => {
        if (err) { return done(err); }
        expect(res).to.have.status(200);
        assert.equal('user created', res.body.message);
        done();
        return null;
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
        return null;
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
        if (err) { return done(err); }
        expect(res).to.have.status(200);
        assert.equal(true, res.body.success);
        done();
        return null;
      });
  });
});
