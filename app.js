var express = require('express');
var _ = require('lodash');
var jwt = require('json-web-token');
var passwordHash = require('password-hash');
var bodyParser = require('body-parser');
var authorization = require('./authorization.js');
var tokenRequired = authorization.tokenRequired;
var mongoose = require('mongoose');
var users = require('./users.js');

var app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.json()); // for parsing application/json

app.get('/', function(req, res) {
  return res.send('hello world');
});

app.get('/users', tokenRequired, users.all);
app.get('/users/:id', tokenRequired, users.read);
app.post('/users', users.create);
app.patch('/users/:id', tokenRequired, users.update);
app.delete('/users/:id', tokenRequired, users.destroy);
app.post('/authenticate', users.authenticate);

app.listen(8080);
