"use strict";

const Ticket = require('../models/ticket.model.js');

exports.getTickets = (request, response) => {
  Ticket.findAll((error, tickets) => {
    if (error) {
      response.status(404).send(error);
    } else {
      response.status(200).send(tickets)
    }
  });
};

exports.addTicket = (request, response) => {
  let ticket = new Ticket(request.body);

  Ticket.create(ticket, (error, ticket) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(201).json(ticket);
    }
  });
};

exports.getTicket = (request, response) => {
  Ticket.findById(request.params.ticketId, (error, ticket) => {
    if (error) {
      response.status(404).send(error);
    } else {
      response.status(200).json(ticket);
    }
  });
};

exports.updateTicket = (request, response) => {
  Ticket.findByIdAndUpdate(request.params.ticketId, new Ticket(request.body), (error, ticket) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(200).json(ticket);
    }
  });
};

exports.deleteTicket = (request, response) => {
  Ticket.findByIdAndRemove(request.params.ticketId, (error, ticket) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(200).json(ticket);
    }
  });
};
