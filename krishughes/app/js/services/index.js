module.exports = function(app) {
	require('./resource_service')(app);
	require('./battle_service')(app);
};
