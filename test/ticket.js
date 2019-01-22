let Ticket = require('../app/controller/appController');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Tickets', () => {
  describe('/GET tickets', () => {
    it('it should GET all the tickets', (done) => {
      chai.request(server)
        .get('/tickets')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          // res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST ticket', () => {
    it('it should not POST a ticket without consecutivo field', (done) => {
      let ticket = {
        id: 1,
        esta_usado: false,
      };

      chai.request(server)
        .post('/ticket')
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
