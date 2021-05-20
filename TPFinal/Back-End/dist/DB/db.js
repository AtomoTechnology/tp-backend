"use strict";

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mysqlconnection = _mysql["default"].createConnection({
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