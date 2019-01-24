"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const routes = require('./app/routes/ticket.routes');
const config = require('config'); //we load the db location from the JSON files

app.listen(port);

console.log('API server started on: ' + port);

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

routes(app);

module.exports = app;
