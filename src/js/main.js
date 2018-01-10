//= "./include.js"

var app = angular.module('app', ['ngRoute', 'angular-jsonrpc-client']);
//= "./services.js"
//= "./controllers.js"

app.config(function ($routeProvider, jsonrpcConfigProvider) {
    jsonrpcConfigProvider.set({
        url: 'http://95.213.207.35:18000/api/',
        returnHttpPromise: true
    });
    $routeProvider
        .when('/', {
            templateUrl: 'js/home/home.controller.html',
            controller: 'homeController'
        })
        .when('/add', {
            templateUrl: 'js/city/city.controller.html',
            controller: 'cityController'
        })
        .when('/edit/:id', {
            templateUrl: 'js/city/city.controller.html',
            controller: 'cityController'
        })
        .otherwise({
            template: '<h1>404 no such page</h1>'
        })
});



