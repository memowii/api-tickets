'user strict';

var sql = require('./db.js');

//Task object constructor
var Ticket = function (ticket) {
  this.id = ticket.id;
  this.consecutivo = ticket.consecutivo;
  this.esta_usado = ticket.esta_usado;
};

Ticket.createTicket = function createTicket(newTicket, result) {
  sql.query("INSERT INTO tickets set ?", newTicket, function (err, res) {

    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Ticket.getTicketById = function getTicketById(ticketId, result) {
  console.log("ticketid ===> " + ticketId);
  sql.query("Select * from tickets where id = ?", ticketId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Ticket.getAllTickets = function getAllTickets(result) {
  sql.query("Select * from tickets", function (err, res) {

    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log('tasks : ', res);

      result(null, res);
    }
  });
};

Ticket.updateById = (id, ticket, result) => {
  sql.query('UPDATE tickets SET consecutivo=?, esta_usado=? WHERE id=?',
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
  sql.query('DELETE FROM tickets WHERE id=?', [id], (error, dbResponse) => {
    if (error) {
      console.log("error: ", err);
      result(null, error);
    } else {
      result(null, dbResponse);
    }
  });  
};

module.exports = Ticket;