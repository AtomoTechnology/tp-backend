"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRoleExisted = exports.checkUserNameNoneRepeat = void 0;

var _db = _interopRequireDefault(require("../DB/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkUserNameNoneRepeat = function checkUserNameNoneRepeat(req, res, next) {
  _db["default"].query('SELECT * FROM accounts where userName =?', [req.body.userName], function (err, rows, fields) {
    if (rows.length > 0) {
      return res.status(400).json({
        error: "error",
        message: "Nombre usuario existe"
      });
    } else {
      next();
    }
  });
};

exports.checkUserNameNoneRepeat = checkUserNameNoneRepeat;

var checkRoleExisted = function checkRoleExisted(req, res, next) {
  if (req.body.idRole) {
    _db["default"].query('SELECT * FROM roles WHERE state =?  and id =?', [1, req.body.idRole], function (err, rows, fields) {
      if (rows.length === 0) {
        return res.status(400).json({
          error: "error",
          message: "Rol no existe"
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({
      error: "error",
      message: "Rol requiere"
    });
  }
};

exports.checkRoleExisted = checkRoleExisted;