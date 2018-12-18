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

/*
Ticket.updateById = function (id, task, result) {
  sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Task.remove = function (id, result) {
  sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {

      result(null, res);
    }
  });
};
*/

module.exports = Ticket;