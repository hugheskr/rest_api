module.exports = function(app) {
  app.controller('SigninController', ['$scope', 'charactersAuth', '$location', function($scope, charactersAuth, $location) {

    $scope.submit = function(user) {
      charactersAuth.signIn(user, function() {
      	$scope.updateUsername();
        $location.path('/home');
      });
    };
  }]);
};
