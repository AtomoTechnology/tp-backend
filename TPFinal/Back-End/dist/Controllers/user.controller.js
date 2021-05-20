"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUser = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var encripto = _interopRequireWildcard(require("../Helpers/Cryptographies"));

var _db = _interopRequireDefault(require("../DB/db"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUser = function getUser(req, res) {
  _db["default"].query('SELECT * FROM users where state = 1', function (err, rows, fields) {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

exports.getUser = getUser;

var getUserById = function getUserById(req, res) {
  var id = req.params.id;

  _db["default"].query('SELECT * FROM users where state = 1 and id =?', [id], function (err, rows, fields) {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
};

exports.getUserById = getUserById;

var createUser = function createUser(req, res) {
  var _req$body = req.body,
      id = _req$body.id,
      firstName = _req$body.firstName,
      lastName = _req$body.lastName,
      address = _req$body.address,
      phone = _req$body.phone,
      userName = _req$body.userName,
      userPass = _req$body.userPass,
      idRole = _req$body.idRole;
  var query = "\n    CALL CreateOrUpdateUser(?, ?, ?, ?, ?, ?, ?, ?);\n    ";
  var pass = "";
  encripto.encryptPassword(userPass).then(function (val) {
    _db["default"].query(query, [id, firstName, lastName, address, phone, idRole, userName, val], function (err, rows, fields) {
      if (!err) {
        return res.json({
          status: 201,
          message: 'El usuario fue guardo con exito'
        });
      } else {
        console.log(err);
      }
    });
  });
};

exports.createUser = createUser;

var updateUser = function updateUser(req, res) {
  var _req$body2 = req.body,
      firstName = _req$body2.firstName,
      lastName = _req$body2.lastName,
      address = _req$body2.address,
      phone = _req$body2.phone;
  var id = req.params.id;
  var query = "\n    CALL CreateOrUpdateUser(?, ?, ?, ?, ?);\n    ";

  _db["default"].query(query, [id, firstName, lastName, address, phone], function (err, rows, fields) {
    if (!err) {
      res.json({
        status: 201,
        message: 'El usuario fue modificado con exito'
      });
    } else {
      console.log(err);
    }
  });
};

exports.updateUser = updateUser;

var deleteUser = function deleteUser(req, res) {
  var id = req.params.id;

  _db["default"].query('UPDATE users SET state = 2 WHERE id =?', [id], function (err, rows, fields) {
    if (!err) {
      res.json({
        status: 201,
        message: 'El usuario fue eliminado con exito'
      });
    } else {
      console.log(err);
    }
  });
};

exports.deleteUser = deleteUser;