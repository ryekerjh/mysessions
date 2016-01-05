var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blockSchema = new Schema({
  session: {type : Schema.ObjectId, ref: 'Block'}
}, {timestamps: 
  { createdAt: 'created_on'}
  });

var Block = mongoose.model('Block', blockSchema);

exports.model = Block;

exports.create = function (req, res) {
  Block
    .create(req.body)
    .then(function(result) {
      res.json(result);
    }, function(err) {
      res.status(400).json(err);
    });
};

exports.all = function(req, res) {
  Block
    .find()
    .then(function(result) {
      res.json(result);
    }, function(err) {
      res.status(400).json(err);
    });
};

exports.read = function (req, res) {
  Block
    .findById(req.params.id)
    .then(function(result) {
      res.json(result);
    }, function(err) {
      res.status(400).json(err);
    });
};
   
exports.update = function (req, res) {
  Block
    .update({ _id: req.params.id }, req.body)
    .then(function(result) {
      Block
        .findById(req.params.id)
        .then(function(result) {
          res.json(result);
        }, function(err) {
          res.status(500).json({ message: err });
        });
    }, function(err) {
      res.status(500).json({ message: err });
    });
};

exports.destroy = function (req, res) {
  Block
    .findByIdAndRemove(req.params.id)
    .then(function(result) {
      res.json({});
    }, function(err) {
      res.status(500).json({ message: err });
    });
};