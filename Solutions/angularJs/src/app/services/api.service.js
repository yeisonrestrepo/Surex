'use strict';

angular.module('surex')
    .factory('ApiService', function ($resource) {
        return {
            $delete: function (id) {
                return $resource('/delete/' + id).delete();
            },
            $update: function (id) {
                return $resource('/put/' + id, null,
                    {
                        put: {
                            method: 'PUT',
                            transformResponse: function (data, headersGetter) {
                                let items = angular.fromJson(data);
                                return items
                            }
                        }
                    }).put();
            }
        };
    });