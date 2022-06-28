
'use strict';


angular
    .module('surex')
    .controller('CallController', function ($scope, $q, ApiService) {
        var vm = this;

        const resource1 = ApiService.$delete(Math.round(Math.random() * 1000));
        const resource2 = ApiService.$delete(Math.round(Math.random() * 1000));
        const resource3 = ApiService.$update(Math.round(Math.random() * 1000));
        const resource4 = ApiService.$update(Math.round(Math.random() * 1000));

        const scheduledForDeletion = [resource1.$promise, resource2.$promise];
        const scheduledForUpdate = [resource3.$promise, resource4.$promise];


        $scope.initCallsWithQ = function () {
            $q.all(scheduledForDeletion).then(
                function (result) {
                    result.forEach(element => {
                        console.log(element.message)
                    });
                }
            )
                .catch(
                    function (error) {
                        console.error('ERROR', error)
                    }
                )
                .finally(
                    function () {
                        $q.all(scheduledForUpdate).then(
                            function (result) {
                                result.forEach(element => {
                                    console.log(element.message)
                                });
                            }
                        )
                            .catch(
                                function (error) {
                                    console.error('ERROR', error)
                                }
                            )
                            .finally(
                                function () { }
                            )
                    }
                )

        }

        $scope.initCallsWithPromises = function () {
            Promise.all(scheduledForDeletion).then(
                function (result) {
                    result.forEach(element => {
                        console.log(element.message)
                    });
                }
            )
                .catch(
                    function (error) {
                        console.error('ERROR', error)
                    }
                )
                .finally(
                    function () {
                        Promise.all(scheduledForUpdate).then(
                            function (result) {
                                result.forEach(element => {
                                    console.log(element.message)
                                });
                            }
                        )
                            .catch(
                                function (error) {
                                    console.error('ERROR', error)
                                }
                            )
                            .finally(
                                function () { }
                            )
                    }
                )
        }

    });