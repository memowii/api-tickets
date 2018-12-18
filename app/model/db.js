'user strict';

let mysql = require('mysql');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gui_tickets'
});

connection.connect(error => {
  if (error) throw error;
});

module.exports = connection;