'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$firebaseObject", function($firebaseObject) {
	const rootRef = firebase.database().ref().child('angular');
	const ref = rootRef.child('object');
	this.object = $firebaseObject(ref);
}]);