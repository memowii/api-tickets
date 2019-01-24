"use strict";

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const fs = require('fs');

chai.use(chaiHttp);

describe('CsvFiles', () => {

  describe('/POST csvFile', () => {
    it('it should POST (or upload) a csv file', (done) => {
      chai.request(server)
        .post('/csvFiles')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test-csv.csv'), 'test-csv.csv')
        .type('form')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          done();
        });
    });
  });
});
