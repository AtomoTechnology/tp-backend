"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

require("../DB/db");

var _user = _interopRequireDefault(require("../Route/user.route"));

var _auth = _interopRequireDefault(require("../Route/auth.router"));

var _package = _interopRequireDefault(require("../../package.json"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); //Settings

app.set('port', process.env.PORT || 3000);
app.set('pkg', _package["default"]); //Middlewares

app.use((0, _morgan["default"])('dev'));
app.get('/', function (req, res) {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
}); // app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // For legacy browser support

};
app.use((0, _cors["default"])(corsOptions));
app.use((0, _helmet["default"])());
app.use(_express["default"].json()); //Routes

app.use('/api/users', _user["default"]);
app.use('/api/auth', _auth["default"]); //Starting

app.listen(app.get('port'), function () {
  console.log('server on port', app.get('port'));
});