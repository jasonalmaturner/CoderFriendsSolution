var app = angular.module('coderFriends');

app.service('githubService', function($http, $q){

  this.getFollowing = function(){
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'http://localhost:9012/api/github/following'
    }).then(function(res){
      deferred.resolve(res.data);
    }, function(err){
      deferred.reject(err);
    })
    return deferred.promise;
  }

})
