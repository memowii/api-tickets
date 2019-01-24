"use strict";

const db = require('./db.js');

const Ticket = function (ticket) {
  this.id = ticket.id;
  this.consecutivo = ticket.consecutivo;
  this.esta_usado = ticket.esta_usado;
};

Ticket.createTicket = (ticket, result) => {
  console.log("ticke.model ", ticket);
  db.query("INSERT INTO tickets set ?", ticket, (error, results) => {
    if (error) {
      result(error, null);
    } else {
      result(null, results);
    }
  });
};

Ticket.getTicketById = (ticketId, result) => {
  db.query("Select * from tickets where id = ?", ticketId, (error, results) => {
    if (error) {
      result(error, null);
    } else {

      result(null, results);
    }
  });
};

Ticket.getAllTickets = (result) => {
  db.query("Select * from tickets", (error, results) => {
    if (error) {
      result(null, error);
    } else {
      result(null, results);
    }
  });
};

Ticket.updateById = (id, ticket, result) => {
  db.query('UPDATE tickets SET consecutivo=?, esta_usado=? WHERE id=?',
    [ticket.consecutivo, ticket.esta_usado, id], (error, results) => {
      if (error) {
        result(null, error);
      } else {
        result(null, results);
      }
    });
};

Ticket.remove = (id, result) => {
  db.query('DELETE FROM tickets WHERE id=?', [id], (error, results) => {
    if (error) {
      result(null, error);
    } else {
      result(null, results);
    }
  });
};

Ticket.truncate = (result) => {
  db.query('TRUNCATE TABLE tickets', (error, results) => {
    if (error) {
      result(null, error);
    } else {
      result(null, results);
    }
  });
};

module.exports = Ticket;
