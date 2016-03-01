var angular = require('angular');

module.exports = function(app) {
  app.controller('BattleController', ['$scope', '$http', 'cfResource',
    function($scope, $http, Resource) {

      var battleService = Resource('/battle');
      $scope.results = '';

      $scope.getBattle = function() {
        battleService.getAll(function(err, res) {
          if (err) return console.log(err);
          $scope.results = res;
        });
      };
  }]);
}
