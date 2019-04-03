require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});

module.exports = connection;
