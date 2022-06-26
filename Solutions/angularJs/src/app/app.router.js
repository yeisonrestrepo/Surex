(function () {
    'use strict';

    angular
        .module('surex')
        .config(['$routeProvider', '$locationProvider', routerConfig]);/** @ngInject */

    function routerConfig($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: './src/app/views/phones.html',
                controller: 'MainController',
                controllerAs: "mainCtrl",
            }).
            otherwise('/');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
})();