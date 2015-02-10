'use strict';

angular.module('angularFullstackApp')
    .controller('FeedbackItemCtrl', function ($rootScope, $scope, $routeParams, backEnd) {
        backEnd.serverReq_get("/api/feedback/" + $routeParams.id + "?resultType=long", {
            resultType: "short",
            success: function (response) {
                var result = response[0];
                for (var i in result) {
                    $scope[i] = result[i];
                }
            },
            error: function (response) {
            }
        });
    });
