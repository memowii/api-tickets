"use strict";

const ticketRoutes = require('./ticket.routes');
// const csvFileRoutes = require('./csvFile.routes');

module.exports = (app) => {
  app.use('/tickets', ticketRoutes);
};
