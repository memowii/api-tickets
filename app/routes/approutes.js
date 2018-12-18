'use strict';

module.exports = (app => {
  let ticketList = require('../controller/appController');

  app.route('/tickets')
    .get(ticketList.listAllTickets)
    .post(ticketList.createTicket);

  app.route('/tickets/:ticketId')
    .get(ticketList.getTicket)
    .put(ticketList.updateTicket)
    .delete(ticketList.deleteTicket);
});