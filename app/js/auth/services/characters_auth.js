module.exports = function(app) {
  app.factory('charactersAuth', ['$http', '$window', '$location', function($http, $window, $location) {
    var token;
    var user;
    var auth = {
      getSignInView: function() {
        $location.path('/signin');
      },
      getSignUpView: function() {
        $location.path('/signup');
      },
      getHomeView: function() {
        $location.path('/home');
      },
      createUser: function(user, cb) {
        cb = cb || function() {};
        $http.post('https://heroesvsvillains.herokuapp.com/api/signup', user)
        // $http.post('http://localhost:3000/api/signup', user)
          .then(function(res) {
            token = $window.localStorage.token = res.data.token;
            cb(null);
          }, function(res) {
            console.log(res);
            cb(res.err);
          });
      },
      signIn: function(user, cb) {
        cb = cb || function() {};
        $http({
          method: 'GET',
          url: 'https://heroesvsvillains.herokuapp.com/api/signin',
          // url: 'http://localhost:3000/api/signin',
          headers: {
            'Authorization' : 'Basic ' + btoa((user.email + ':' + user.password))
          }
        })
        .then(function(res) {
          token = $window.localStorage.token = res.data.token;
          cb(null);
        }, function(res) {
          console.log(res);
          cb(res);
        });
      },
      getToken: function() {
        token = token || $window.localStorage.token;
        return token;
      },
      logOut: function(cb) {
        $window.localStorage.token = null;
        token = null;
        user = null;
        if (cb) cb();
      },
      getUsername: function(cb) {
        cb = cb || function(){};
        $http({
          method: 'GET',
          url: 'https://heroesvsvillains.herokuapp.com/api/currentuser',
          // url: 'http://localhost:3000/api/currentuser',
          headers: {
            token: auth.getToken()
          }
        })
        .then(function(res) {
          user = res.data.username;
          cb(res);
        }, function(res) {
          cb(res);
        });
      },
      username: function() {
        if(!user) auth.getUsername();
        return user;
      }
  	};
    return auth;
  }]);
};
