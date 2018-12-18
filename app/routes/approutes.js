'use strict';

module.exports = function (app) {
  let ticketList = require('../controller/appController');

  // Routes
  app.route('/tickets')
    .get(ticketList.list_all_tickets)
    .post(ticketList.create_a_ticket);

  app.route('/tickets/:ticketId')
    .get(ticketList.read_a_ticket)
    .put(ticketList.update_a_ticket)
    .delete(ticketList.delete_a_ticket);
};