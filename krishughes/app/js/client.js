const angular = require('angular');
//require('angular-route');
const supersApp = angular.module('supersApp', []);
require(__dirname + '/services/resource_service')(supersApp);

require('./services')(supersApp);

require('./characters')(supersApp);
require('./directives/form_directive')(supersApp);

// supersApp.config(['$routeProvider', function(routes) {
//   routes
//     .when('/home', {
//     	controller: ''
//     })
// }]);
