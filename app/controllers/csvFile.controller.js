"use strict";

const multer = require('multer');
const Ticket = require('../models/ticket.model');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/tmp');
  },
  filename: function(req, file, cb) {
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

  const csvtojson = require('csvtojson');
  const csvConverter = csvtojson({
    noheader: true,
  });

  csvConverter.fromFile(fileInfo.path).then(jsonContentFile => {
    let rowIndx = 0;
    const tickets = [];

    if (isStringAlpha(jsonContentFile[0].field1)) {
      rowIndx = 1;
    }

    for (rowIndx; rowIndx < jsonContentFile.length; rowIndx++) {
      let ticket = [
        jsonContentFile[rowIndx].field1,
        false
      ];

      tickets.push(ticket);
    }

    Ticket.insertMany(tickets, ((err, result) => {
      res.status(201).json({
        message: "CSV file uploaded.",
      });
    }));
  });
};
