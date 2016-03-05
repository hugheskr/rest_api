module.exports = function(app) {
  app.controller('authController', ['$scope', 'charactersAuth', '$location', function($scope, charactersAuth, $location) {
    $scope.username = null;

    $scope.updateUsername = function() {
    	charactersAuth.getUsername(function(res) {
    		$scope.username = res.data.username;
    	});
    };

    $scope.logOut = function() {
      charactersAuth.logOut(function() {
        $scope.username = null;
      });
    };

    $scope.signInView = function() {
    	$location.path('/signin');
    }

    $scope.signUpView = function() {
    	$location.path('/signin');
    }
  }]);
};
