var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var memberSchema = new Schema({
  user: { type : Schema.ObjectId, ref: 'User' },
  connected: Boolean
}, {
  _id: false
});
var sessionSchema = new Schema({
  name: String,
  members: [memberSchema]
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  }
});
var Session = mongoose.model('Session', sessionSchema);

exports.Model = Session;

exports.create = function(req, res) {
  Session
    .create(req.body)
    .then(function(result) {
      res.json(result);
    }, function(err) {
      res.status(400).json(err);
    });
};

exports.all = function(req, res) {
  Session
    .find()
    .then(function(result) {
      res.json(result);
    }, function(err) {
      res.status(400).json(err);
    });
};

exports.read = function(req, res) {
  Session
    .findById(req.params.id)
    .populate('members.user')
    .then(function(result) {
      res.json(result);
    }, function(err) {
      res.status(400).json(err);
    });
};
