var angular = require('angular');

module.exports = function(app) {
  app.controller('HeroesController', ['$scope', '$http', 'cfResource', 'bResource',
    function($scope, $http, Resource, BResource) {

      $scope.heroes = [];
      var heroService = Resource('/heroes');
      var battleService = BResource();

      $scope.toggleEdit = function(hero) {
        if (hero.backup) {
          var temp = hero.backup;
          $scope.heroes.splice($scope.heroes.indexOf(hero), 1, temp);
        } else {
          hero.backup = angular.copy(hero);
          hero.editing = true;
        }
      };

      $scope.getAllHeroes = function() {
        heroService.getAll(function(err, res) {
          if (err) return console.log(err);
          $scope.heroes = res;
        });
      };

      $scope.createHero = function(hero) {
        heroService.create(hero, function(err, res) {
          if (err) return console.log(err);
          $scope.heroes.push(res);
          $scope.super = null;
        });
      };

      $scope.deleteHero = function(hero) {
        heroService.delete(hero, function(err, res) {
          if (err) return console.log(err);
          $scope.heroes.splice($scope.heroes.indexOf(hero), 1);
        });
      };

      $scope.updateHero = function(hero) {
        heroService.update(hero, function(err, res) {
          hero.editing = false;
          hero.backup = null;
          if (err) return console.log(err);
        });
      };
  }]);
}
