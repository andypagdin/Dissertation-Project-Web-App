'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {

	 $scope.stocks = [
      {
        symbol : "AAPL",
        name : "Apple"
      },
      {
        symbol : "YHOO",
        name : "Yahoo"
      },
      {
        symbol : "MSFT",
        name : "Microsoft"
      },
    ];

$scope.showGraph = function(symbol){
	var _now = new Date(),
	_chart;

	function createUrl(url, qs) {
	    if(!qs) { return url; }

	    var params = Object.keys(qs);
	    if(params.length) {
	        url = url + '?' + params.map(function(p) {
	            return p +'='+ encodeURIComponent(qs[p]);
	        }).join('&');
	    }
	    
	    return url;
	}

	function getMean(items, getItemNumber) {
	    getItemNumber = getItemNumber || function(x) { return x; };
	    
	    var len = items.length,
	        sum = 0;
	    
	    var i = len;
	    while (i--) {
	        sum = sum + getItemNumber(items[i]);
	    }
	    
	    var mean = sum/len;
	    return mean;
	 }

	function createUrlYahoo(ticker, from, to) {
	    //"Historical Prices" -> "Set Date Range" -> "Get Prices"..
	    //  http://finance.yahoo.com/q/hp?s=MSFT&a=00&b=1&c=2015&d=11&e=31&f=2015&g=d
	    //.. -> "Download to Spreadsheet":
	    //  http://real-chart.finance.yahoo.com/table.csv?s=MSFT&a=00&b=1&c=2015&d=11&e=31&f=2017&g=d&ignore=.csv
	    
	    var urlBase = 'http://real-chart.finance.yahoo.com/table.csv';
	    var qs = {};
	    
	    function qsDate(paramNames, date) {
	        //Yahoo format: Month (zero based) *before* day, and then year:
	        //http://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
	        var dateParts = [date.getUTCMonth(), date.getUTCDate(), date.getUTCFullYear()];
	        
	        dateParts.forEach(function(d, i) {
	            qs[paramNames[i]] = d;
	        });
	    }
	    
	    qs.s = ticker;
	    qsDate(['a', 'b', 'c'], from);
	    qsDate(['d', 'e', 'f'], to);
	    qs.g = 'd';
	    qs.ignore = '.csv';
	    
	    var url = createUrl(urlBase, qs);
	    return url;
	}

	function renderYahoo(name, data) {
	    
	    var days = data.split('\n').filter(function(row, i) {
	        //Remove header row and any empty rows (there's usually one at the end):
	        return (row && (i !== 0));
	    });
	    //console.log(days);
	    
	    //.sort(): Highcharts wants the data sorted ascending by date,
	    //         and luckily each "day" row starts with the date in the sortable yyyy-mm-dd format:
	    var ohlcData = days.sort()
	                       .map(function(day) {
	        var dayInfo = day.split(',');
	        return [
	            //new Date('2015-08-11') => UTC (which is what we want)
	            //new Date(2015, 7, 11)  => Local
	            new Date(dayInfo[0]).getTime(),
	            
	            Number(dayInfo[1]),
	            Number(dayInfo[2]),
	            Number(dayInfo[3]),
	            Number(dayInfo[4]),
	        ];
	    });
	    
	    var ohlcSeries = {
	        name: name,
	        data: ohlcData,

	        type: 'line',
	        //http://stackoverflow.com/questions/9849806/data-grouping-into-weekly-monthly-by-user
	        dataGrouping: { enabled: false },
	        tooltip:      { valueDecimals: 2 },
	    };

	    $scope.$apply(function () {
	    	$scope.symbol = symbol
	    	$scope.data = ohlcData
            $scope.high = ohlcData[251][1]
    	});

	    _chart.addSeries(ohlcSeries);
	}

	$(function () {
	    _chart = new Highcharts.StockChart({
	        chart: {
	            renderTo: document.querySelector('#chart1 .chart')
	        },
	        // title: {
	        //     text: symbol + ' Stock Price'
	        // },
	        rangeSelector: {
	            //3 months:
	            selected: 1
	        }
	    });

	    var ticker = symbol
	    var to = new Date(_now);
	    var from = new Date(to);
	    from.setMonth(to.getMonth() - 12);
	    
	    //Responds with 404 through crossorigin.me. Alternative service:
	    //https://www.bountysource.com/issues/39833634-origin-header-is-required
	    //  var url = '//crossorigin.me/' + createUrlYahoo(ticker, from, to);
	    var url = '//cors-anywhere.herokuapp.com/' + createUrlYahoo(ticker, from, to);
	    
	    $.get(url, function (data) {
	        //document.write('<pre>'+data+'</pre>');
	        renderYahoo(ticker, data);
	    });
	});
	}
}]);













