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

    // function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    //     $urlRouterProvider.otherwise('/');
    //     $stateProvider
    //         .state('/', {
    //             url: '/',
    //             templateUrl: './app/views/phones.html',
    //             controller: 'MainController',
    //             controllerAs: "mainCtrl",

    //             resolve: {
    //                 'title': ['$rootScope', function ($rootScope) {
    //                     $rootScope.title = "Surex Canada Phobe Directive";
    //                 }]
    //             }

    //         });

    //     $locationProvider.html5Mode({
    //         enabled: true,
    //         requireBase: false
    //     });
    // }

})();