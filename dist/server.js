// var gzippo = require('gzippo');
var express = require('express');
var app = express();

/*
app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/app"));
app.listen(process.env.PORT || 5000);
*/

var oneDay = 86400000;

app.use(express.compress());
app.use(express.static(__dirname + '/app', { maxAge: oneDay }));
app.listen(process.env.PORT || 5000);