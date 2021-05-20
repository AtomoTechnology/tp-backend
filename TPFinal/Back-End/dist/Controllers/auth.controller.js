"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = void 0;

var encripto = _interopRequireWildcard(require("../Helpers/Cryptographies"));

var _config = _interopRequireDefault(require("../config/config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _db = _interopRequireDefault(require("../DB/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var signin = function signin(req, res) {
  var _req$body = req.body,
      userName = _req$body.userName,
      userPass = _req$body.userPass;

  _db["default"].query('SELECT * FROM login where userName =? and state =?', [userName, 1], function (err, rows, fields) {
    if (!err) {
      var userfound = rows[0];

      if (!userfound) {
        return res.status(400).json({
          error: "No encontrado",
          message: "Usuario incorrecto"
        });
      } else {
        var pass = encripto.compare(userPass, userfound.userPass);

        if (!pass) {
          return res.status(401).json({
            error: "No encontrado",
            message: "contraseña incorrecta",
            token: ""
          });
        } else {
          var token = _jsonwebtoken["default"].sign({
            id: userfound.id
          }, _config["default"].SECRET, {
            expiresIn: 86400 // vence en un dia

          });

          return res.status(200).json({
            token: token
          });
        }
      }
    } else {
      return res.status(400).json({
        error: "Error",
        message: "No se pude establecer la conexion"
      });
    }
  });
};

exports.signin = signin;