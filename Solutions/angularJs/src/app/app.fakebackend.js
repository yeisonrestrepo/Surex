'use strict';

angular.module('surex').run(function($httpBackend) {
    $httpBackend.whenGET(/.*/).passThrough();

    $httpBackend.whenDELETE(/\/delete\/\d+/).respond(function(method, url, data) {
        var resourceid = url.split('/')[2];
        return [200, {id: resourceid, status: 200, message: `Resource ID: ${resourceid} successfully deleted`}, {}];
    });

    $httpBackend.whenPUT(/\/put\/\d+/).respond(function(method, url, data) {
        var resourceid = url.split('/')[2];
        return [200, {id: resourceid, status: 200, message: `Resource ID: ${resourceid} successfully updated`}, {}];
    });

});