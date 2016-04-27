var mongoose = require('mongoose');
var express = require('express');
var app = express();
var heroesRouter = require(__dirname + '/routes/heroes_routes');
var villainsRouter = require(__dirname + '/routes/villains_routes');
var battleRouter = require(__dirname + '/routes/battle_routes');
var authRouter = require(__dirname + '/routes/auth_routes');
var userRouter = require(__dirname + '/routes/user_routes');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/super_stream_dev');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', heroesRouter);
app.use('/api', villainsRouter);
app.use('/api', battleRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);

app.listen(process.env.PORT || 3000, function() {
	console.log('server up');
});
