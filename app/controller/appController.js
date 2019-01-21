'use strict';

const Ticket = require('../model/appModel.js');
const multer = require('multer');

exports.listAllTickets = (request, response) => {
  Ticket.getAllTickets((error, ticket) => {
    if (error) response.send(error);

    response.send(ticket);
  });
};

exports.createTicket = (request, response) => {
  let ticket = new Ticket(request.body);

  Ticket.createTicket(ticket, (error, ticket) => {
    if (error) response.send(error);

    response.json(ticket);
  });
};

exports.getTicket = (request, response) => {
  Ticket.getTicketById(request.params.ticketId, (error, ticket) => {
    if (error) response.send(error);

    response.json(ticket);
  });
};

exports.updateTicket = (request, response) => {
  Ticket.updateById(request.params.ticketId, new Ticket(request.body), (error, ticket) => {
    if (error) response.send(error);

    response.json(ticket);
  });
};

exports.deleteTicket = (request, response) => {
  Ticket.remove(request.params.ticketId, (error, ticket) => {
    if (error) response.send(error);

    response.json({
      message: 'Ticket successfully deleted'
    });
  });
};

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

exports.uploadFile = upload;
