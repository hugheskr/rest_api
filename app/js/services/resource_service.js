var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  }
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  }
};

module.exports = exports = function(app) {
  app.factory('cfResource', ['$http', 'charactersAuth', function($http, charactersAuth) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
  };

    Resource.prototype.getAll = function(callback) {
      // $http.get('https://heroesvsvillains.herokuapp.com/api' + this.resourceName)
      $http.get('http://localhost:3000/api' + this.resourceName)
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data, callback) {
      $http({
        method: 'POST',
        // url: 'https://heroesvsvillains.herokuapp.com/api' + this.resourceName,
        url: 'http://localhost:3000/api' + this.resourceName,
        data: data,
        headers: {
          token: charactersAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.delete = function(data, callback) {
      $http({
        method: 'DELETE',
        // url: 'https://heroesvsvillains.herokuapp.com/api' + this.resourceName + '/' + data._id,
        url: 'http://localhost:3000/api' + this.resourceName + '/' + data._id,
        headers: {
          token: charactersAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(data, callback) {
      $http({
        method: 'PUT',
        // url: 'https://heroesvsvillains.herokuapp.com/api' + this.resourceName + '/' + data._id,
        url: 'http://localhost:3000/api' + this.resourceName + '/' + data._id,
        data: data,
        headers: {
          token: charactersAuth.getToken()
        }
      })
      .then(handleSuccess(callback), handleFailure(callback));
    };
    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};
