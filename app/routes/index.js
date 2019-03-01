"use strict";

const ticketRoutes = require('./ticket.routes');
const csvFileRoutes = require('./csvFile.routes');

module.exports = (app) => {
  app.use('/api/v1/tickets', ticketRoutes);
  app.use('/api/v1/csvFiles', csvFileRoutes);
};
