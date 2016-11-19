var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookieParser');
var logger = require('morgan');
var mongoose = require('mongoose');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var app = express();
app.set('port', (process.env.PORT || 3000));

// Connect to monogo db
mongoose.connect('mongodb://localhost:27107/lab5');


// Models

module.exports = app;