"use strict";

process.env.NODE_ENV = 'test';

const Ticket = require('../app/models/ticket.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const fs = require('fs');

chai.use(chaiHttp);

describe('CsvFiles', () => {

  beforeEach((done) => {
    Ticket.truncate().then(() => {
      done();
    });
  });

  afterEach((done) => {
    Ticket.truncate().then(() => {
      done();
    });
  });

  describe('/POST csvFile', () => {
    it('it should POST (or upload) a csv file', (done) => {
      chai.request(server)
        .post('/csvFiles')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_normal_csv.csv'),
          'test_normal_csv.csv')
        .type('form')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          res.body.should.have.property('affectedRows').equal(5);
          done();
        });
    });

    it('it should not POST a csv file, and return a message that the uploaded file is empty', (done) => {
      chai.request(server)
        .post('/csvFiles')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_csv_without_data.csv'),
          'test_csv_without_data.csv')
        .type('form')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').equal('El archivo test_csv_without_data.csv no contiene datos.');
          done();
        });
    });

    it('it should POST a csv file, and avoid saving those consecutivos repeated in the csv file', (done) => {
      chai.request(server)
        .post('/csvFiles')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_csv_with_consecutivos_repeated.csv'),
          'test_csv_with_consecutivos_repeated.csv')
        .type('form')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('affectedRows').equal(5);
          done();
        });
    });

    it("it should POST a csv file, the consecutivo title row is not in the file", (done) => {
      chai.request(server)
        .post('/csvFiles')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_csv_without_consecutivo_row.csv'),
          'test_csv_without_consecutivo_row.csv')
        .type('form')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('affectedRows').equal(5);
          done();
        });
    });

    it('it should POST (or upload) several csv files', (done) => {
      chai.request(server)
        .post('/csvFiles')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_csv_several_files_1.csv'),'test_csv_several_files_1.csv')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_csv_several_files_2.csv'),'test_csv_several_files_2.csv')
        .type('form')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          res.body.should.have.property('affectedRows').equal(10);
          done();
        });
    });

    it('it should POST (or upload) several csv files with consecutivos repeated', (done) => {
      chai.request(server)
        .post('/csvFiles')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_csv_several_files_1.csv'),'test_csv_several_files_1.csv')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_csv_several_files_2.csv'),'test_csv_several_files_2.csv')
        .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_csv_several_files_3.csv'),'test_csv_several_files_3.csv')
        .type('form')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          res.body.should.have.property('affectedRows').equal(10);
          done();
        });
    });

    it('it should try to POST (or upload) a csv file but its consecutivos are already saved in the database', (done) => {
      const tickets = [
        [1, false],
        [2, false],
        [3, false],
        [4, false],
        [5, false],
      ];

      Ticket.insertMany(tickets).then((DBResults) => {
        chai.request(server)
          .post('/csvFiles')
          .attach('csvfile', fs.readFileSync('./test/testCsvFiles/test_normal_csv.csv'),'test_normal_csv.csv')
          .type('form')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.should.have.property('affectedRows').equal(0);
            done();
          });
      });
    });
  });
});
