'use strict';

const Ticket = require('../model/appModel.js');

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