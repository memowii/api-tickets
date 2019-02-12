"use strict";

const Ticket = require('../models/ticket.model.js');
const HTTPStatus = require('http-status');

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(HTTPStatus.OK).json(tickets);
  } catch (error) {
    res.status(HTTPStatus.NOT_FOUND).send(error);
  }
};

exports.addTicket = async (req, res) => {
  const ticket = new Ticket(req.body);
  try {
    const DBResults = await Ticket.create(ticket);
    res.status(HTTPStatus.CREATED).json(DBResults);
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).send(error);
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    res.status(HTTPStatus.OK).json(ticket);
  } catch (error) {
    res.status(HTTPStatus.NOT_FOUND).send(error);
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const DBResults = await Ticket.findByIdAndUpdate(req.params.ticketId, new Ticket(req.body));
    res.status(HTTPStatus.OK).json(DBResults);
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).send(error);
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const DBResults = await Ticket.findByIdAndRemove(req.params.ticketId);
    res.status(HTTPStatus.OK).json(DBResults);
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).send(error);
  }
};
