"use strict";

const Ticket = require('../models/ticket.model.js');
const HTTPStatus = require('http-status');

exports.getTickets = async (request, response) => {
  try {
    const tickets = await Ticket.findAll();
    response.status(HTTPStatus.OK).json(tickets);
  } catch (e) {
    response.status(HTTPStatus.NOT_FOUND).send(e);
  }
};

exports.addTicket = async (request, response) => {
  const ticket = new Ticket(request.body);
  try {
    const DBResults = await Ticket.create(ticket);
    response.status(HTTPStatus.CREATED).json(DBResults);
  } catch (e) {
    response.status(HTTPStatus.BAD_REQUEST).send(e);
  }
};

exports.getTicket = async (request, response) => {
  try {
    const ticket = await Ticket.findById(request.params.ticketId);
    response.status(HTTPStatus.OK).json(ticket);
  } catch (e) {
    response.status(HTTPStatus.NOT_FOUND).send(e);
  }
};

exports.updateTicket = async (request, response) => {
  try {
    const DBResults = await Ticket.findByIdAndUpdate(request.params.ticketId, new Ticket(request.body));
    response.status(HTTPStatus.OK).json(DBResults);
  } catch (e) {
    response.status(HTTPStatus.BAD_REQUEST).send(e);
  }
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
