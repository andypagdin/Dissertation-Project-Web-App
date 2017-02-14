'use strict';

var config = {
    apiKey: "AIzaSyBS_f8iFjI_s47ZQ3G_WozAGvKq9ECc9g0",
    authDomain: "dissertation-project-web-app.firebaseapp.com",
    databaseURL: "https://dissertation-project-web-app.firebaseio.com",
    storageBucket: "dissertation-project-web-app.appspot.com",
    messagingSenderId: "539669352812"
};

firebase.initializeApp(config);

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'firebase',
  'ngMaterial',
  'myApp.news',
  'myApp.about'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/stocks'});
}]);
