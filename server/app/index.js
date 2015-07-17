'use strict';

var app = require('express')();
var path = require('path');

var session = require('express-session');

app.use(session({
    secret: 'tongiscool'
}));

app.use(require('./logging.middleware'));

app.use(require('./sass.middleware'));

app.use(require('./requestState.middleware'));

app.use(function(req, res, next) {
    if (!req.session.counter) req.session.counter = 0;
    console.log('counter', ++req.session.counter);
    console.log(req.session.userId);
    next();
});

app.use(require('./statics.middleware'));

app.use('/api', require('../api'));



app.get('/*', function(req, res) {
    var index = path.join(__dirname, '..', '..', 'public', 'index.html');
    res.sendFile(index);
});

app.use(require('./error.middleware'));

module.exports = app;