"use strict";

const db = require('./db.js');

const Ticket = function (ticket) {
  this.id = ticket.id;
  this.consecutivo = ticket.consecutivo;
  this.esta_usado = ticket.esta_usado;
};

Ticket.create = (ticket) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO tickets set ?", ticket, (error, DBResults) => {
      if (error) {
        reject(error);
      }
      resolve(DBResults);
    });
  });
};

Ticket.findById = (ticketId) => {
  return new Promise((resolve, reject) => {
    db.query("Select * from tickets where id = ?", ticketId, (error, DBResult) => {
      if (error) {
        reject(error);
      }
      resolve(DBResult);
    });
  });
};

Ticket.findAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tickets WHERE esta_usado=1 UNION SELECT * FROM tickets WHERE esta_usado=0",
      (error, DBResults) => {
      if (error) {
        reject(error);
      }
      resolve(DBResults);
    });
  });
};

Ticket.findByIdAndUpdate = (id, ticket) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE tickets SET consecutivo=?, comentario=?, esta_usado=? WHERE id=?',
      [ticket.consecutivo, ticket.comentario, ticket.esta_usado, id], (error, DBResults) => {
      if (error) {
        reject(error);
      }
      resolve(DBResults);
    });
  });
};

Ticket.findByIdAndRemove = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM tickets WHERE id=?', [id], (error, DBResults) => {
      if (error) {
        reject(error);
      }
      resolve(DBResults);
    });
  });
};

Ticket.insertMany = (tickets) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO tickets (consecutivo, comentario, esta_usado) VALUES ?', [tickets], (error, DBResults) => {
      if (error) {
        reject(error);
      }
      resolve(DBResults);
    });
  });
};

Ticket.truncate = () => {
  return new Promise((resolve, reject) => {
    db.query('TRUNCATE TABLE tickets', (error, DBResults) => {
      if (error) {
        reject(error);
      }
      resolve(DBResults);
    });
  });
};

module.exports = Ticket;
