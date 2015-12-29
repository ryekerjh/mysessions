var express = require('express');
var bodyParser = require('body-parser');
var authorization = require('./authorization.js');
var tokenRequired = authorization.tokenRequired;
var mongoose = require('mongoose');
var users = require('./users.js');
var sessions = require('./sessions.js');

var app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(express.static(__dirname + '/build'));
app.use(bodyParser.json()); // for parsing application/json

app.get('/users', tokenRequired, users.all);
app.post('/users', users.create);
app.get('/users/:id', tokenRequired, users.read);
app.patch('/users/:id', tokenRequired, users.update);
app.delete('/users/:id', tokenRequired, users.destroy);
app.post('/authenticate', users.authenticate);

app.get('/sessions', sessions.all);
app.post('/sessions', sessions.create);
app.get('/sessions/:id', sessions.read);

app.listen(process.env.PORT || 8080);
