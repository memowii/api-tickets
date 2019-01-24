"use strict";

const mysql = require('mysql');
const config = require('config');
const connection = mysql.createConnection(config.DBConfig);

connection.connect(error => {
  if (error) throw error;
});

module.exports = connection;
