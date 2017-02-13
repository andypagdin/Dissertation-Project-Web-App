'use strict';

angular.module('myApp.news', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/news', {
    templateUrl: 'news/news.html',
    controller: 'NewsCtrl'
  });
}])

.controller('NewsCtrl', ['$scope', '$location', function($scope, $location) {

	$scope.go = function(hash) {
		$location.path(hash);
	};

}]);