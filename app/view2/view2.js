'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/stocks', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

	$scope.go = function(hash) {
		$location.path(hash);
	};

	$scope.stocks = [
      {
        symbol : "AAPL",
        shortName : "Apple",
        longName : "Apple Inc.",
        description : "Apple Inc. is an American multinational corporation that designs and manufactures consumer electronics and software products. It was established in Cupertino, California, on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne, and was incorporated on January 3, 1977."
      },
      {
        symbol : "YHOO",
        shortName : "Yahoo",
        longName : "Yahoo! Inc.",
        description : "Yahoo! Inc. (Yahoo), along with its subsidiaries, incorporated in 1995, is engaged in digital information discovery. The Company focuses on informing, connecting and entertaining its users with its search (Yahoo Search), communications, including Yahoo Mail and Yahoo Messenger and digital content products, including Tumblr, and its over four verticals, such as Yahoo News, Yahoo Sports, Yahoo Finance and Yahoo Lifestyle. The Company's segments include the Americas; Europe, Middle East and Africa (EMEA), and Asia Pacific."
      },
      {
        symbol : "MSFT",
        shortName : "Microsoft",
        longName : "Microsoft Corporation",
        description : "Microsoft Corporation, incorporated on September 22, 1993, is a technology company. The Company develops, licenses, and supports a range of software products, services and devices. The Company's segments include Productivity and Business Processes, Intelligent Cloud and More Personal Computing. The Company's products include operating systems; cross-device productivity applications; server applications; business solution applications; desktop and server management tools; software development tools; video games, and training and certification of computer system integrators and developers."
      },
      {
        symbol : "AAL",
        shortName : "American Airlines",
        longName : "American Airlines Group, Inc.",
        description : "American Airlines Group Inc. (AAG), incorporated on February 16, 1982, is a holding company whose primary business activity is the operation of a network air carrier through its subsidiaries, American Airlines, Inc. (American) and its regional subsidiaries, Envoy Aviation Group Inc. (Envoy), Piedmont Airlines, Inc. (Piedmont) and PSA Airlines, Inc. (PSA) that operate under capacity purchase agreements as American Eagle."
      },
      {
        symbol : "NFLX",
        shortName : "Netflix",
        longName : "Netflix, Inc.",
        description : "Netflix, Inc. (Netflix), incorporated on August 29, 1997, is an Internet television network with over 86 million members in over 190 countries enjoying more than 125 million hours of television (TV) shows and movies per day, including original series, documentaries and feature films. Members can watch as much as they want, anytime, anywhere, on nearly any Internet-connected screen. Members can play, pause and resume watching, all without commercials or commitments."
      },
      {
        symbol : "TSLA",
        shortName : "Tesla",
        longName : "Tesla, Inc.",
        description : "Tesla, Inc., formerly Tesla Motors, Inc., incorporated on July 1, 2003, designs, develops, manufactures and sells electric vehicles and energy storage products. The Company produces and sells two electric vehicles: the Model S sedan and the Model X sport utility vehicle (SUV). The Company has delivered over 107,000 Model S vehicles across the world. In addition to developing its own vehicles, it sells energy storage products. Its energy storage products include the seven kilowatt-hour and 10 kilowatt-hour Powerwall for residential applications, and the 100 kilowatt-hour Powerpack for commercial and industrial applications."
      },
      {
        symbol : "IBM",
        shortName : "IBM",
        longName : "International Business Machines Corporation",
        description : "The company originated in 1911 as the Computing-Tabulating-Recording Company (CTR) and was renamed International Business Machines in 1924. IBM manufactures and markets computer hardware, middleware and software, and offers hosting and consulting services in areas ranging from mainframe computers to nanotechnology."
      },
      {
        symbol : "WMT",
        shortName : "Walmart",
        longName : "Walmart Stores, Inc.",
        description : "Wal-Mart Stores, Inc. engages in retail and wholesale business. It operates through the following business segments: Walmart U.S., Walmart International, and Sam's Club. The Walmart U.S. segment includes retail store and digital retail operations in the U.S. It also offers financial services and related products such as money orders, prepaid cards, wire transfers, check cashing, and bill payment."
      },
      {
        symbol : "JPM",
        shortName : "JPMorgan Chase",
        longName : "JPMorgan Chase & Co.",
        description : "JPMorgan Chase & Co. (JPMorgan Chase), incorporated on October 28, 1968, is a financial holding company. The Company is engaged in investment banking, financial services for consumers and small businesses, commercial banking, financial transaction processing and asset management. JPMorgan Chase's activities are organized into four business segments, as well as a Corporate segment. The Company's segments are Consumer & Community Banking, Corporate & Investment Bank, Commercial Banking and Asset Management."
      },
      {
        symbol : "NVDA",
        shortName : "Nvidia",
        longName : "Nvidia Corporation",
        description : "in 1999 sparked the growth of the PC gaming market, redefined modern computer graphics, and revolutionized parallel computing. More recently, GPU deep learning ignited modern AI — the next era of computing — with the GPU acting as the brain of computers, robots, and self-driving cars that can perceive and understand the world. Today, NVIDIA is increasingly known as “the AI computing company.”"
      }
    ];

    $scope.charts = [
    	{
    		name : "Line",
    		value : "line"
    	},
    	{
    		name : "Candlestick",
    		value : "candlestick"
    	}
    ];

	angular.forEach($scope.stocks, function(value, key){
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20LastTradePriceOnly%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + value.symbol + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
	$http.get(url).then(function(response) {
		var LastTradePrice = response.data.query.results.quote.LastTradePriceOnly;
		value.price = LastTradePrice
	});
	})

	// angular.forEach($scope.stocks, function(value, key){
	// var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + value.symbol + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
	// $http.get(url).then(function(response) {
	// 	var LastTradePrice = response.data.query.results.quote;
	// 	//var Volume = response.data.query.results.quote.Volume;
	// 	//value.price = LastTradePrice
	// 	//value.volume = Volume
	// 	console.log(LastTradePrice)
	// });
	// })

	function RefreshFeed($scope, $http) {
		// Define the JSON feed for fetching the RSS feed
		var jsonFeed = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'" + $scope.rssFeed + "'%20limit%201&format=json";
		// Actually fetch the feed
		$http.get(jsonFeed).success(function (data) {
		    $scope.feed = data.query.results.rss;
		});
	}

	$scope.showGraph = function(item){
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

		    // Close value for the second to last item in the data
		    var yesterdayOpen = ohlcData.slice(-2)[0][1]
		    // Close value for the last item in the data
		    var todayOpen = ohlcData.slice(-1)[0][1]
		    var increase = todayOpen - yesterdayOpen
		    increase = increase / yesterdayOpen * 100
		    if(increase > 0)
		    {
		    	$scope.percentageChange = increase
		    	$scope.changeSymbol = "+"
		    	$scope.dynamicClass = "tickUp"
		    }else{
		    	var decrease = yesterdayOpen - todayOpen
		    	decrease = decrease / yesterdayOpen * 100
		    	$scope.percentageChange = decrease
		    	$scope.changeSymbol = "-"
				$scope.dynamicClass = "tickDown"
		    }

		    $scope.$apply(function () {
		    	$scope.more = "More";
		    	$scope.companyProfileLink = "https://finance.yahoo.com/quote/"+item.symbol+"/profile?p="+item.symbol
		    	$scope.headlines = "Latest headlines for ";
		    	$scope.stats = "Stats";
		    	$scope.about = "About";
		    	$scope.description = item.description
		    	$scope.shortName = item.shortName
		    	$scope.longName = item.longName
		    	$scope.symbol = item.symbol
		    	$scope.data = ohlcData
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

		    var ticker = item.symbol
		    var to = new Date(_now);
		    var from = new Date(to);
		    from.setMonth(to.getMonth() - 12);
		    
		    //Responds with 404 through crossorigin.me. Alternative service:
		    //https://www.bountysource.com/issues/39833634-origin-header-is-required
		    //  var url = '//crossorigin.me/' + createUrlYahoo(ticker, from, to);
		    var url = '//cors-anywhere.herokuapp.com/' + createUrlYahoo(ticker, from, to);
		    
		    $.get(url, function (data) {
		        renderYahoo(ticker, data);
		    });
		});
		$scope.rssFeed = "http://finance.yahoo.com/rss/headline?s=" + item.symbol;
		RefreshFeed($scope,$http)
	}
}]);













