'use strict';

angular.module('myApp.news', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/news', {
    templateUrl: 'news/news.html',
    controller: 'NewsCtrl'
  });
}])

.controller('NewsCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

	$scope.stocks = [
      {
        symbol : "AAPL"
      },
      {
        symbol : "YHOO"
      },
      {
        symbol : "MSFT"
      },
      {
        symbol : "AAL"
      },
      {
        symbol : "NFLX"
      },
      {
        symbol : "TSLA"
      },
      {
        symbol : "IBM"
      },
      {
        symbol : "WMT"
      },
      {
        symbol : "JPM"
      },
      {
        symbol : "NVDA"
      }
    ];

    $scope.newsArr = [];

	$scope.go = function(hash) {
		$location.path(hash);
	};

	function RefreshFeed($scope, $http) {
		// Define the JSON feed for fetching the RSS feed
		var jsonFeed = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'" + $scope.rssFeed + "'%20limit%201&format=json";
		// Actually fetch the feed
		$http.get(jsonFeed).success(function (data) {
		    $scope.feed = data.query.results.rss.channel;
		    $scope.newsArr.push($scope.feed)
		});
	}

	angular.forEach($scope.stocks, function(value, key){
		$scope.rssFeed = "http://finance.yahoo.com/rss/headline?s="+value.symbol;
		RefreshFeed($scope,$http)
	})
	// console.log($scope.newsArr)
}]);