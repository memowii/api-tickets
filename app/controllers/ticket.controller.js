"use strict";

const Ticket = require('../models/ticket.model.js');
const HTTPStatus = require('http-status');

exports.getTickets = (request, response) => {
  Ticket.findAll((error, tickets) => {
    if (error) {
      response.status(HTTPStatus.NOT_FOUND).send(error);
    } else {
      response.status(HTTPStatus.OK).send(tickets)
    }
  });
};

exports.addTicket = (request, response) => {
  let ticket = new Ticket(request.body);

  Ticket.create(ticket, (error, ticket) => {
    if (error) {
      response.status(HTTPStatus.BAD_REQUEST).send(error);
    } else {
      response.status(HTTPStatus.CREATED).json(ticket);
    }
  });
};

exports.getTicket = (request, response) => {
  Ticket.findById(request.params.ticketId, (error, ticket) => {
    if (error) {
      response.status(HTTPStatus.NOT_FOUND).send(error);
    } else {
      response.status(HTTPStatus.OK).json(ticket);
    }
  });
};

exports.updateTicket = (request, response) => {
  Ticket.findByIdAndUpdate(request.params.ticketId, new Ticket(request.body), (error, ticket) => {
    if (error) {
      response.status(HTTPStatus.BAD_REQUEST).send(error);
    } else {
      response.status(HTTPStatus.OK).json(ticket);
    }
  });
};

exports.deleteTicket = (request, response) => {
  Ticket.findByIdAndRemove(request.params.ticketId, (error, ticket) => {
    if (error) {
      response.status(HTTPStatus.BAD_REQUEST).send(error);
    } else {
      response.status(HTTPStatus.OK).json(ticket);
    }
  });
};
