const angular = require('angular');
require('angular-route');
const supersApp = angular.module('supersApp', ['ngRoute']);

require('./services')(supersApp);
require('./characters')(supersApp);
require('./directives/form_directive')(supersApp);
require('./auth')(supersApp);

supersApp.config(['$routeProvider', function(routes) {
  routes
    .when('/home', {
      controller: 'CharactersController',
      templateUrl: '/views/characters_view.html'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four_view.html'
    });
}]);
