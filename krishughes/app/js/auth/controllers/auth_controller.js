module.exports = function(app) {
  app.controller('authController', ['$scope', 'charactersAuth', function($scope, charactersAuth) {
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
      charactersAuth.getSignInView();
    };

    $scope.signUpView = function() {
      charactersAuth.getSignUpView();
    };

    $scope.homeView = function() {
      charactersAuth.getHomeView();
    };
  }]);
};
