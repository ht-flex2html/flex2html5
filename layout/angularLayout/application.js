var app = angular.module('myApp', ['ui.router']);

app.run()

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("/main");

    $stateProvider