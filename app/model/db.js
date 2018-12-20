'user strict';

let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'gui_tickets'
});

connection.connect(error => {
  if (error) throw error;
});

module.exports = connection;
