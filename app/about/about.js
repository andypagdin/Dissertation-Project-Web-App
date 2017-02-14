'use strict';

angular.module('myApp.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'about/about.html',
    controller: 'AboutCtrl'
  });
}])

.controller('AboutCtrl', ['$scope', '$location', function($scope, $location) {

	$scope.go = function(hash) {
		$location.path(hash);
	};

}]);