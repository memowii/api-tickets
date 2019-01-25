"use strict";

const Ticket = require('../models/ticket.model');
const multer = require('multer');
const csvtojson = require('csvtojson');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

exports.upload = upload.single('csvfile');

function isStringAlpha(string) {
  return /^[a-zA-Z]+$/.test(string);
}

exports.saveTicketsFromCsvFile = (req, res, next) => {
  const fileInfo = req.file;

  const csvConverter = csvtojson({
    noheader: true,
  });

  csvConverter.fromFile(fileInfo.path).then(jsonContentFile => {
    let rowIndx = 0;
    const ticketsToSave = [];

    if (isStringAlpha(jsonContentFile[0].field1)) {
      rowIndx = 1;
    }

    for (rowIndx; rowIndx < jsonContentFile.length; rowIndx++) {
      let newTicket = [
        jsonContentFile[rowIndx].field1,
        false
      ];

      if (!ticketsToSave.find(ticket => ticket[0] === newTicket[0])) {
        ticketsToSave.push(newTicket);
      }
    }

    Ticket.findAll((err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      const DBTickets = result;
      const unrepeatedTickets = ticketsToSave.filter((ticketToSave) => {
        return !DBTickets.find((DBTicket) => {
          return ticketToSave[0] === DBTicket.consecutivo;
        });
      });

      Ticket.insertMany(unrepeatedTickets, ((err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json({
            message: "Archivo csv subido.",
          });
        }
      }));
    });
  });
};
