const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const jsonParser = require('body-parser').json();
const User = require(__dirname + '/../models/user');
const handleError = require(__dirname + '/../lib/handle_server_error');

const router = module.exports = exports = express.Router();

router.get('/currentuser', jwtAuth, (req,res) => {
  User.findOne({_id: req.user._id}, (err,data) => {
    if(err) return handleError(err, res);
    res.json({username: data.username});
  });
});
