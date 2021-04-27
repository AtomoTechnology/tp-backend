"use strict";

var express = require('express');

var cors = require('cors');

var app = express(); //Settings

app.set('port', process.env.PORT || 3000); //Middlewares

app.use(cors());
app.use(express.json()); //Routes

app.use(require('../Route/user')); //Starting

app.listen(app.get('port'), function () {
  console.log('server on port', app.get('port'));
});