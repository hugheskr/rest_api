module.exports = function(app) {
  app.controller('authController', ['$scope', 'charactersAuth', '$window', function($scope, charactersAuth, $window) {
    $scope.username = null;

    $scope.updateUsername = function() {
      if ($window.localStorage.token && $window.localStorage.token !== 'null') {
        charactersAuth.getUsername(function(res) {
          $scope.username = res.data.username;
        });
      } else {
        $scope.username = null;
      }
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
