"use strict";

process.env.NODE_ENV = 'test';

const Ticket = require('../app/model/appModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Tickets', () => {

  beforeEach((done) => {
    Ticket.truncate((error, ticket) => {
      if (error) console.log(error);
    });
    done();
  });

  afterEach((done) => {
    Ticket.truncate((error, ticket) => {
      if (error) console.log(error);
    });
    done();
  });

  describe('/GET tickets', () => {
    it('it should GET all the tickets', (done) => {
      chai.request(server)
        .get('/tickets')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST ticket', () => {
    it('it should not POST a ticket without consecutivo field', (done) => {
      let ticket = {
        esta_usado: false,
      };

      chai.request(server)
        .post('/tickets')
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('sqlMessage');
          done();
        });
    });

    it('it should POST a ticket', (done) => {
      let ticket = {
        consecutivo: 99999,
        esta_usado: false,
      };

      chai.request(server)
        .post('/tickets')
        .send(ticket)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('insertId').equal(1);
          done();
        });
    });
  });

  describe('/GET/:id ticket', () => {
    it('it should GET a ticket by the given id', (done) => {
      let ticket = {
        consecutivo: 99999,
        esta_usado: false,
      };

      Ticket.createTicket(ticket, (error, ticket) => {
        chai.request(server)
          .get('/tickets/' + ticket.insertId)
          .send(ticket)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].should.have.property('id');
            res.body[0].should.have.property('consecutivo');
            res.body[0].should.have.property('esta_usado');
            done();
          });
      });
    });
  });

  describe('/PUT/:id ticket', () => {
    it('it should UPDATE a ticket given the id', (done) => {
      let ticket = {
        consecutivo: 99999,
        esta_usado: false,
      };

      Ticket.createTicket(ticket, (error, ticket) => {
        chai.request(server)
          .put('/tickets/' + ticket.insertId)
          .send({consecutivo: 100000, esta_usado: false,})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('affectedRows').equal(1);
            done();
          });
      });
    });
  });

  describe('/DELETE/:id ticket', () => {
    it('it should DELETE a ticket given the id', (done) => {
      const ticket = {
        consecutivo: 99999,
        esta_usado: false,
      };

      Ticket.createTicket(ticket, (error, ticket) => {
        chai.request(server)
          .delete('/tickets/' + ticket.insertId)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('affectedRows').equal(1);
            done();
          });
      });
    });
  });
});
