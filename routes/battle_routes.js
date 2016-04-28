var express = require('express');
var Hero = require(__dirname + '/../models/hero');
var Villain = require(__dirname + '/../models/villain');
var handleError = require(__dirname + '/../lib/handle_server_error');
var battleRouter = module.exports = exports = express.Router();
var jwtAuth = require(__dirname + '/../lib/jwt_auth');

battleRouter.get('/battle', function(req, res) {
  var heroTotal = 0;
  var villainTotal = 0;
  //sum hero levels
  var p1 = new Promise(
    function(resolve, reject) {
      Hero.aggregate(
        [
          {$group: {_id: null, total: {$sum: "$level"}}}
        ], function(err, data) {
          if(err) return handleError(err, res);
          heroTotal = data[0].total || 0;
          resolve(heroTotal);
          });
    });
  //sum villain levels after promise is fulfilled
  p1.then(
    Villain.aggregate(
            [
              {$group: {_id: null, total: {$sum: "$level"}}}
            ], function(err, data) {
                if(err) return handleError(err, res);
                  villainTotal = data[0].total || 0;
                  if(heroTotal > villainTotal) {
                    res.send('Heroes win the Battle!');
                  } else if (villainTotal > heroTotal) {
                    res.send('Villains win the Battle!');
                  } else if (villainTotal === heroTotal) {
                    res.send('It was a tie!');
                  }
              })).catch(
                function(reason) {
                  console.log(reason);
                });
});

