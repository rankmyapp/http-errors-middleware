const expect = require('chai').expect;
const request = require('supertest');
const errorHandler = require('..');
const server = require('./mockServer');

const port = 21239;
server.use(errorHandler());
server.listen(21239);

describe('Error handler middleware', () => {
  it('should properly handle the a thrown error', (done) => {
    request(`localhost:${port}`) 
      .get('/error')
      .expect(500)
      .end((err, res) => {
        expect(res.body).to.be.an('Object');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.include.all.keys(['title', 'name', 'message']);
        expect(res.body.error.message).to.be.equal('Intentional Error');
        expect(res.body.error.title).to.be.equal('Internal Server Error');
        return done(err);
      });
  });
});
