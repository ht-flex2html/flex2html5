var app = angular.module('myApp', ['ui.router']);

app.run()

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("/main");

    $stateProvider
		.state("FlexGrid", {
			url: "/FlexGrid",
			templateUrl: "views/FlexGrid.html",
			nresolve: {},
			controller:"FlexGridController"
		})
		.state("main", {
			url: "/main",
			templateUrl: "views/main.html",
			nresolve: {},
			controller:"mainController"
		})
})