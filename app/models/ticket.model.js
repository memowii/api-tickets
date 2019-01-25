"use strict";

const db = require('./db.js');

const Ticket = function (ticket) {
  this.id = ticket.id;
  this.consecutivo = ticket.consecutivo;
  this.esta_usado = ticket.esta_usado;
};

Ticket.create = (ticket, result) => {
  db.query("INSERT INTO tickets set ?", ticket, (error, results) => {
    if (error) {
      result(error, null);
    } else {
      result(null, results);
    }
  });
};

Ticket.findById = (ticketId, result) => {
  db.query("Select * from tickets where id = ?", ticketId, (error, results) => {
    if (error) {
      result(error, null);
    } else {

      result(null, results);
    }
  });
};

Ticket.findAll = (result) => {
  db.query("SELECT * FROM tickets WHERE esta_usado=1 UNION SELECT * FROM tickets WHERE esta_usado=0",
    (error, results) => {
    if (error) {
      result(null, error);
    } else {
      result(null, results);
    }
  });
};

Ticket.findByIdAndUpdate = (id, ticket, result) => {
  db.query('UPDATE tickets SET consecutivo=?, esta_usado=? WHERE id=?',
    [ticket.consecutivo, ticket.esta_usado, id], (error, results) => {
      if (error) {
        result(null, error);
      } else {
        result(null, results);
      }
    });
};

Ticket.findByIdAndRemove = (id, result) => {
  db.query('DELETE FROM tickets WHERE id=?', [id], (error, results) => {
    if (error) {
      result(null, error);
    } else {
      result(null, results);
    }
  });
};

Ticket.insertMany = (tickets, result) => {
  db.query('INSERT INTO tickets (consecutivo, esta_usado) VALUES ?', [tickets], (error, results) => {
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
