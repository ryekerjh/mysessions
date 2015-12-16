var express = require('express');
var _ = require('lodash');
var jwt = require('json-web-token');
var passwordHash = require('password-hash');
var bodyParser = require('body-parser');
var authorization = require('./authorization.js')
var tokenRequired = authorization.tokenRequired;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.json()); // for parsing application/json

app.get('/', function(req, res) {
  return res.send('hello world');
});

var userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: String
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
});
var User = mongoose.model('User', userSchema);

app.get('/users', tokenRequired, function(req, res) {
  User
    .find() 
    .then(function(result) {
      res.json({ items: result });
    }, function(err) {
      res.status(500).json({ 'message': err });
    });
});

app.get('/users/:id', tokenRequired, function(req, res) {
  User
    .findById(req.params.id)
    .then(function(result) {
      res.json(result);
    }, function(err) {
      res.status(500).json({ 'message': err });
    });
});

app.post('/users', function(req, res) {
  req.body.password = passwordHash.generate(req.body.password);
  User
    .create(req.body)
    .then(function(result) {
      res.json(result);
    }, function(err) {
      res.status(400).json(err);
    });
});

app.post('/authenticate', function(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(function(result) {
      var user;
      var isVerified = passwordHash.verify(req.body.password, result.password);

      if (isVerified) {
        user = result;
        jwt.encode(process.env.JWT_SECRET, result, function (err, token) {
          user.token = token;
          if (err) 
            res.status(400).json(err);
          else
            res.json(user);
        });
      } else {
        res.status(403).send('Not Authorized');
      }
    }, function(err) {
      res.status(400).json(err);
    });
});

app.patch('/users/:id', tokenRequired, function(req, res) {
  User
    .update({ _id: req.params.id }, req.body)
    .then(function(result) {
      User
        .findById(req.params.id)
        .then(function(result) {
          res.json(result);
        }, function(err) {
          res.status(500).json({ message: err });
        });
    }, function(err) {
      res.status(500).json({ message: err });
    });
});

app.delete('/users/:id', tokenRequired, function(req, res) {
  User
    .findByIdAndRemove(req.params.id)
    .then(function(result) {
      res.json({});
    }, function(err) {
      res.status(500).json({ message: err });
    });
});

app.listen(8080);
