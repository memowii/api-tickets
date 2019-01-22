'use strict';

const db = require('./db.js');

const Ticket = function (ticket) {
  this.id = ticket.id;
  this.consecutivo = ticket.consecutivo;
  this.esta_usado = ticket.esta_usado;
};

Ticket.createTicket = (ticket, result) => {
  db.query("INSERT INTO tickets set ?", ticket, (error, dbResponse) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
    } else {
      console.log(dbResponse.insertId);
      result(null, dbResponse.insertId);
    }
  });
};

Ticket.getTicketById = (ticketId, result) => {
  db.query("Select * from tickets where id = ?", ticketId, (error, dbResponse) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
    } else {
      result(null, dbResponse);
    }
  });
};

Ticket.getAllTickets = (result) => {
  db.query("Select * from tickets", (error, dbResponse) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
    } else {
      result(null, dbResponse);
    }
  });
};

Ticket.updateById = (id, ticket, result) => {
  db.query('UPDATE tickets SET consecutivo=?, esta_usado=? WHERE id=?',
    [ticket.consecutivo, ticket.esta_usado, id], (error, dbResponse) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
      } else {
        result(null, dbResponse);
      }
    });
};

Ticket.remove = (id, result) => {
  db.query('DELETE FROM tickets WHERE id=?', [id], (error, dbResponse) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
    } else {
      result(null, dbResponse);
    }
  });
};

module.exports = Ticket;
