'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

// Fetching data from Firebase database
// .controller('View1Ctrl', ["$firebaseObject", function($firebaseObject) {
// 	const rootRef = firebase.database().ref().child('angular');
// 	const ref = rootRef.child('object');
// 	this.object = $firebaseObject(ref);
// }]);

.controller('View1Ctrl', ['$http', '$scope', '$timeout', function($http, $scope, $timeout) {
	var symbolOne = "AAPL";
	var symbolTwo = "YHOO";
	var tick = function(){
		var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22"+symbolTwo+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
  		$http.get(url).then(function(response) {
        	$scope.query = response.data.query.results.quote;
        	$timeout(tick, 2000);
        	//console.log(response.data.query.results.quote)
    	});
  	};
  	tick();
}]);