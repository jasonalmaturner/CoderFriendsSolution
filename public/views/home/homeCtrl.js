var app = angular.module('coderFriends');

app.controller('homeCtrl', function($scope, followers){

console.log(followers);
$scope.followers = followers;

})
