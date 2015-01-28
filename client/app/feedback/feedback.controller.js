'use strict';

angular.module('angularFullstackApp')
    .controller('FeedbackCtrl', function ($scope, $http) {

        var tempResult = false;
        $scope.isListAvailable = false;
        $scope.isDBCreated = (typeof window.localStorage.isDBCreated === "undefined");
        $scope.result = {};
        $scope['autoNumbers'] = [
            {auto_number: 'HR26AH1286', rating: 4, driver_name: "rahul"},
            {auto_number: 'HR26AM8499', rating: 3, driver_name: "yogendra"},
            {auto_number: 'HR26BW6602', rating: 1, driver_name: "rahul"},
            {auto_number: 'HR26CH1599', rating: 4, driver_name: "rahul"}
        ];

        $scope.getFeedback = function () {
            $scope.isListAvailable = $scope.autoNumber.trim().length > 2;
            if (!tempResult)this.serverReq_post("/api/feedback", $scope.autoNumber.trim());
        };

        $scope.serverReq_get = function (api) {
            tempResult = true;
            $http.get(api)
                .success(function (response) {
                    $scope.result.data = response;
                    $scope.result.type = "success";
                    tempResult = false;
                })
                .error(function (response) {
                    $scope.result.data = response;
                    $scope.result.type = "error";
                });
        };

        $scope.serverReq_post = function (api, params) {
            tempResult = true;
            $http.post(api, {data: params})
                .success(function (response) {
                    $scope.result.data = response;
                    $scope.result.type = "success";
                    tempResult = false;
                })
                .error(function (response) {
                    $scope.result.data = response;
                    $scope.result.type = "error";
                });
        };

        $scope.createDatabase = function () {
            for (var i = 0; i < $scope.autoNumbers.length; i++) {
                this.serverReq_post("/api/feedback", $scope.autoNumbers[i]);
                window.localStorage.isDBCreated = true;
                $scope.isDBCreated = true;
            }
        }

    });
