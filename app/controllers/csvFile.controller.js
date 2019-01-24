"use strict";

const multer = require('multer');

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

exports.upload = upload;

exports.saveTicketsFromCsvFile = (req, res, next) => {
  const fileInfo = req.file;

  const csvtojson = require('csvtojson');
  const csvConverter = csvtojson({
    noheader: true,
  });

  csvConverter.fromFile(fileInfo.path).then(jsonObj => {
    return jsonObj
  });

  res.status(201).json({
    message: "CSV file uploaded.",
  });
};
