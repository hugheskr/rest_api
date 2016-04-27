var angular = require('angular');

module.exports = function(app) {
  app.controller('CharactersController', ['$scope', '$http', 'cfResource',
    function($scope, $http, Resource) {

      $scope.heroes = [];
      $scope.villains = [];
      $scope.heroService = Resource('/heroes');
      $scope.villainService = Resource('/villains');
      $scope.errors = [];

      $scope.dismissError = function(err) {
        $scope.errors.splice($scope.errors.indexOf(err), 1);
      };

      $scope.toggleEdit = function(character, list) {
        if (character.backup) {
          var temp = character.backup;
          list.splice(list.indexOf(character), 1, temp);
        } else {
          character.backup = angular.copy(character);
          character.editing = true;
        }
      };

      $scope.getAllCharacters = function(service, list) {
        service.getAll(function(err, res) {
          if (err) return console.log(err);
          if(list === $scope.heroes) {
            $scope.heroes = res;
          }
          if(list === $scope.villains) {
            $scope.villains = res;
          }
        });
      };

      $scope.createCharacter = function(character, service, list) {
        service.create(character, function(err, res) {
          if (err) {
            $scope.errors.push('Please signin. Could not save "' + character.name + '"');
            return console.log(err);
          }
          list.push(res);
          character.level = null;
          character.name = null;
        });
      };

      $scope.deleteCharacter = function(character, service, list) {
        service.delete(character, function(err, res) {
          if (err) {
            $scope.errors.push('Please signin. Could not delete "' + character.name +'"');
            return console.log(err);
          }
          list.splice(list.indexOf(character), 1);
        });
      };

      $scope.updateCharacter = function(character, service) {
        service.update(character, function(err, res) {
          if (err) {
            $scope.errors.push('Please signin. Could not update character "' + character.name + '"');
            return console.log(err);
          }
          character.editing = false;
          character.backup = null;
        });
      };
  }]);
}
