'use strict';

angular.module('surex')
    .config(ResourceStates)
    .controller(SampleController)

/* @ngInject */
export default function ResourceStates($stateProvider) {
    $stateProvider.state('resource', {
        url: '/resource',
        resolve: {
            resource: function () {
                let resource = { foo: 'bar', uri: 'http:/localhosUapUquestion/1' };
                return resource;
            }
        },
        views: {
            'base': {
                template: require(' ./resource.html'),
                controller: ctrls.SampleController
            }
        }
    })
}

// resource.controllers.js
/* @ngInject */
export default function SampleController($scope, Shttp, resource) {
    // The formData can be updated in the controller template
    $scope.formData = Object.assign({}, resource);
    $scope.onSubmit = function () {
        $scope.submitting = true;
        // It saves the changes from copy into the resource object.
        $http.put(resource.uri, $scope.formData).then(function (response) {
            $scope.result = resource;
        }).catch(function (error) {
            $scope.result = error;
        }).finally(function () { 
            $scope.submitting = false;
        });
    }
}
