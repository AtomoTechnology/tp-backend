"use strict";

var mysql = require('mysql');

var mysqlconnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kayak'
});
mysqlconnection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('DB is conected');
  }
});
module.exports = mysqlconnection;