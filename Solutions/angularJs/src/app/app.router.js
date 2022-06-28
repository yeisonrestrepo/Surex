(function () {
    'use strict';

    angular
        .module('surex')
        .config(['$routeProvider', '$locationProvider', routerConfig]);/** @ngInject */

    function routerConfig($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: './src/app/views/main.html',
                controller: 'MainController',
                controllerAs: "mainCtrl",
            }).
            when('/phones', {
                templateUrl: './src/app/views/phones.html',
                controller: 'PhoneController',
                controllerAs: "phoneCtrl",
            }).
            when('/calls', {
                templateUrl: './src/app/views/calls.html',
                controller: 'CallController',
                controllerAs: "callCtrl",
            }).
            otherwise('/');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
})();