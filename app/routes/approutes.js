'use strict';

module.exports = app => {
  let ticketController = require('../controller/appController');

  app.route('/tickets')
    .get(ticketController.listAllTickets)
    .post(ticketController.createTicket);

  app.route('/tickets/:ticketId')
    .get(ticketController.getTicket)
    .put(ticketController.updateTicket)
    .delete(ticketController.deleteTicket);

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
};
