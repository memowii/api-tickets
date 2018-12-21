'use strict';

module.exports = app => {
  let ticketController = require('../controller/appController');

  app.route('/tickets')
    .get(ticketController.listAllTickets)
    .post(ticketController.createTicket);

  app.route('/tickets/:ticketId')
    .get(ticketController.getTicket)
    .put(ticketController.updateTicket)
    .delete(ticketController.deleteTicket);
};
