var jwt = require('json-web-token');

exports.tokenRequired = function tokenRequired(req, res, next) {
  var split;
  var token;
  var authHeader = req.headers.authorization;

  if (!req.headers.authorization)
    res.status(500).json({ 'message': 'there is no authorization header' });

  var split = authHeader.split(' ');
  var token = split[1];

  if (token) {
    jwt.decode(process.env.JWT_SECRET, token, function (err, user) {
      if (err)
        res.status(500).json({ 'message': err });

      User
        .findById(user._id) 
        .then(function(result) {
          req.user = result;
          next();
        }, function(err) {
          res.status(403).json({ 'message': 'Unauthorized' });
        });
    });
  } else {
    res.status(403).json({ 'message': 'Unauthorized' });
  }
}
