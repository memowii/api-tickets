'use strict';

var Ticket = require('../model/appModel.js');

exports.list_all_tickets = function (req, res) {
  Ticket.getAllTickets(function (err, task) {

    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', task);
    res.send(task);
  });
};

exports.create_a_ticket = function (req, res) {
  var new_ticket = new Ticket(req.body);

  //handles null error 
  if (!new_ticket.task || !new_ticket.status) {
    res.status(400).send({
      error: true,
      message: 'Please provide task/status'
    });
  } else {
    Ticket.createTicket(new_ticket, function (err, ticket) {

      if (err)
        res.send(err);
      res.json(ticket);
    });
  }
};

exports.read_a_ticket = function (req, res) {
  Ticket.getTicketById(req.params.ticketId, function (err, ticket) {
    if (err) res.send(err);
    res.json(ticket);
  });
};

exports.update_a_ticket = function (req, res) {
  Ticket.updateById(req.params.ticketId, new Ticket(req.body), function (err, ticket) {
    if (err)
      res.send(err);
    res.json(ticket);
  });
};

exports.delete_a_ticket = function (req, res) {
  Ticket.remove(req.params.ticketId, function (err, ticket) {
    if (err)
      res.send(err);
    res.json({
      message: 'Ticket successfully deleted'
    });
  });
};