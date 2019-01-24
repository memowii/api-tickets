"use strict";

const Ticket = require('../models/ticket.model.js');

exports.listAllTickets = (request, response) => {
  Ticket.getAllTickets((error, tickets) => {
    if (error) {
      response.status(404).send(error);
    } else {
      response.status(200).send(tickets)
    }
  });
};

exports.createTicket = (request, response) => {
  let ticket = new Ticket(request.body);

  Ticket.createTicket(ticket, (error, ticket) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(201).json(ticket);
    }
  });
};

exports.getTicket = (request, response) => {
  Ticket.getTicketById(request.params.ticketId, (error, ticket) => {
    if (error) {
      response.status(404).send(error);
    } else {
      response.status(200).json(ticket);
    }
  });
};

exports.updateTicket = (request, response) => {
  Ticket.updateById(request.params.ticketId, new Ticket(request.body), (error, ticket) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(200).json(ticket);
    }
  });
};

exports.deleteTicket = (request, response) => {
  Ticket.remove(request.params.ticketId, (error, ticket) => {
    if (error) {
      response.status(400).send(error);
    } else {
      response.status(200).json(ticket);
    }
  });
};
