
'use strict';


angular
    .module('surex')
    .controller('MainController', function ($scope) {
        var vm = this;

        $scope.title = "Gestión de usuarios";
        $scope.phone = '';
    });