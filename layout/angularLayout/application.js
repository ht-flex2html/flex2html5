var app = angular.module('myApp', ['ui.router']);

app.run()

app.config(	function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("/main");

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'views/main.html',
            resolve: {},
            controller:'mainController'
        });
       
})

