"use strict";

const db = require('./db.js');

const Ticket = function (ticket) {
  this.id = ticket.id;
  this.consecutivo = ticket.consecutivo;
  this.esta_usado = ticket.esta_usado;
};

Ticket.create = (ticket) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO tickets set ?", ticket, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

Ticket.findById = (ticketId) => {
  return new Promise((resolve, reject) => {
    db.query("Select * from tickets where id = ?", ticketId, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

Ticket.findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tickets WHERE esta_usado=1 UNION SELECT * FROM tickets WHERE esta_usado=0", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

Ticket.findByIdAndUpdate = (id, ticket) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE tickets SET consecutivo=?, esta_usado=? WHERE id=?',
      [ticket.consecutivo, ticket.esta_usado, id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

Ticket.findByIdAndRemove = (id, result) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM tickets WHERE id=?', [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

Ticket.insertMany = (tickets, result) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO tickets (consecutivo, esta_usado) VALUES ?', [tickets], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

Ticket.truncate = (result) => {
  return new Promise((resolve, reject) => {
    db.query('TRUNCATE TABLE tickets', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = Ticket;
