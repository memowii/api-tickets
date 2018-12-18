'user strict';

const db = require('./db.js');

class Ticket {

  constructor(ticket) {
    this.id = ticket.id;
    this.consecutivo = ticket.consecutivo;
    this.esta_usado = ticket.esta_usado;
  }

  static createTicket(ticket, result) {
    db.query("INSERT INTO tickets set ?", ticket, (error, dbResponse) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
      } else {
        console.log(dbResponse.insertId);
        result(null, dbResponse.insertId);
      }
    });
  }

  static getTicketById(ticketId, result) {
    db.query("Select * from tickets where id = ?", ticketId, (error, dbResponse) => {
      if (error) {
        console.log("error: ", error);
        result(error, null);
      } else {
        result(null, dbResponse);
      }
    });
  }

  static getAllTickets(result) {
    db.query("Select * from tickets", (error, dbResponse) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
      } else {
        console.log('tasks : ', dbResponse);
        result(null, dbResponse);
      }
    });
  }

  static updateById(id, ticket, result) {
    db.query('UPDATE tickets SET consecutivo=?, esta_usado=? WHERE id=?',
    [ticket.consecutivo, ticket.esta_usado, id], (error, dbResponse) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
      } else {
        result(null, dbResponse);
      }
    });
  }

  static remove(id, result) {
    db.query('DELETE FROM tickets WHERE id=?', [id], (error, dbResponse) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
      } else {
        result(null, dbResponse);
      }
    });  
  }
}

module.exports = Ticket;