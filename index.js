const server = require(__dirname + '/server');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/app_dev');
server();
//Launches server
