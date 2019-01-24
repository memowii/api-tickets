"use strict";

app.post('/csvfile', ticketController.uploadFile.single('csvfile'), (req, res, next) => {
  const fileInfo = req.file;

  const csvtojson = require('csvtojson');
  const csvConverter = csvtojson({
    noheader: true,
  });

  csvConverter.fromFile(fileInfo.path).then(jsonObj => {
    return jsonObj
  });

  res.status(201).json({
    message: "CSV file uploaded successfully",
  });
});
