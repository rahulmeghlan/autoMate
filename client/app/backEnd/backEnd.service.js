'use strict';

angular.module('angularFullstackApp')
    .service('backEnd', function ($http) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var obj = {};
        obj.serverReq_get = function (api, callBacks) {
            $http.get(api, {data: callBacks.resultType})
                .success(function (response) {
                    callBacks.success(response);
                })
                .error(function (response) {
                    callBacks.error(response);
                });
        };

        obj.serverReq_post = function (api, params, callBacks) {
            $http.post(api, {data: params}, {
                transFormRequest: angular.identity
            })
                .success(function (response) {
                    callBacks.success(response)
                })
                .error(function (response) {
                });
        };
        return obj;
    });
