module.exports = function(app) {
  app.directive('charactersForm', function() {
    return {
    	restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/characters/directives/form_directive.html',
      scope: {
    	  buttonText: '@',
    	  super: '=',
    	  save: '&'
    	},
      controller: 'CharactersController'
    };
  });
};
