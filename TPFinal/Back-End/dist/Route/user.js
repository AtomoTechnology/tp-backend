"use strict";

var express = require('express');

var router = express.Router();

var mysqlconnection = require('../DB/db'); //Get All user


router.get('/api/user/', function (req, res) {
  mysqlconnection.query('SELECT * FROM users where state = 1', function (err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
}); //Get by id

router.get('/api/user/:id', function (req, res) {
  var id = req.params.id;
  mysqlconnection.query('SELECT * FROM users where state = 1 and id =?', [id], function (err, rows, fields) {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
}); //Create

router.post('/api/user/', function (req, res) {
  var _req$body = req.body,
      id = _req$body.id,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      address = _req$body.address,
      phone = _req$body.phone;
  var query = "\n    CALL CreateOrUpdateUser(?, ?, ?, ?, ?);\n    ";
  mysqlconnection.query(query, [id, firstName, lastName, address, phone], function (err, rows, fields) {
    if (!err) {
      res.json({
        status: 'success',
        message: 'El usuario fue guardo con exito'
      });
    } else {
      console.log(err);
    }
  });
}); //Update

router.put('/api/user/:id', function (req, res) {
  var _req$body2 = req.body,
      firstName = _req$body2.firstName,
      lastName = _req$body2.lastName,
      address = _req$body2.address,
      phone = _req$body2.phone;
  var id = req.params.id;
  var query = "\n    CALL CreateOrUpdateUser(?, ?, ?, ?, ?);\n    ";
  mysqlconnection.query(query, [id, firstName, lastName, address, phone], function (err, rows, fields) {
    if (!err) {
      res.json({
        status: 'success',
        message: 'El usuario fue modificado con exito'
      });
    } else {
      console.log(err);
    }
  });
}); //Delete

router["delete"]('/api/user/:id', function (req, res) {
  var id = req.params.id;
  mysqlconnection.query('UPDATE users SET state = 2 WHERE id =?', [id], function (err, rows, fields) {
    if (!err) {
      res.json({
        status: 'success',
        message: 'El usuario fue eliminado con exito'
      });
    } else {
      console.log(err);
    }
  });
});
module.exports = router;