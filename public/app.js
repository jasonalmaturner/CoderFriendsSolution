var app =  angular.module('coderFriends', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
  .when('/home', {
    templateUrl: 'views/home/home.html',
    controller: 'homeCtrl',
    resolve: {
      followers: function(githubService){
        return githubService.getFollowing();
      }
    }
  })
  .when('/friend/:github-username', {
    templateUrl: 'views/friend/friend.html'
  })
});
