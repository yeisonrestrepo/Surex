require('angular/angular.min.js');
require('angular-mocks/angular-mocks.js');
require('../src/app/controllers/sample.controller.js');

describe('SampleController', function () {
    beforeEach(function () {
        angular.mock.module('surex');
    });

    let $controller, $rootScope, $httpBackend, $mockResponse, mockFormData;

    beforeEach(inject(function (_$controller_, _$rootScope_, $injector) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = $injector.get('$httpBackend');
        $mockResponse = [
            { question: 'Is it ok?', answer: 'Perfect!'},
            { question: 'How is the weather?', answer: 'It\'s sunny'},
        ];
        mockFormData = { foo: 'bar', uri: '/testUri' };

        $httpBackend.when('GET', "/testUri").respond($mockResponse);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('$scope.onSubmit', function () {

        it('should contain formData', function () {
            let $scope = $rootScope.$new();
            let controller = $controller('SampleController', { $scope: $scope, resource: () => mockFormData });
            expect($scope.formData).toContain(mockFormData);
        });

        it('sets the submitting to true when the onSubmit is called', function () {
            let $scope = $rootScope.$new();
            let controller = $controller('SampleController', { $scope: $scope, resource: () => mockFormData });
            $scope.onSubmit();
            expect($scope.submitting).toBe(true);
        });
        
        it('should contain results', function() {
            let $scope = $rootScope.$new();
            let controller = $controller('SampleController', { $scope: $scope, resource: () => mockFormData });
            $scope.onSubmit();
            expect($scope.result.length).toEqual(2);
        })
    });
})