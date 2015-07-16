'use strict'; 

var app = require('express')();
var path = require('path');

app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', 'http://localhost 	:4040');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Api-Key'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});


app.use(require('./logging.middleware'));

app.use(require('./sass.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api'));

app.get('/*', function (req, res) {
	var index = path.join(__dirname, '..', '..', 'public', 'index.html');
	res.sendFile(index);
});

app.use(require('./error.middleware'));

module.exports = app;