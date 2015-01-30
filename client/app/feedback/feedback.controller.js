'use strict';

angular.module('angularFullstackApp')
    .controller('FeedbackCtrl', function ($scope, $http) {

        var tempResult = false,
            count = 0;
        $scope.isListAvailable = false;
        $scope.result = {};
        $scope['autoNumbers'] = [
            {auto_number: 'HR26AH1286', rating: 4, driver_name: "rahul"},
            {auto_number: 'HR26AM8499', rating: 3, driver_name: "yogendra"},
            {auto_number: 'HR26BW6602', rating: 1, driver_name: "rahul"},
            {auto_number: 'HR26CH1599', rating: 4, driver_name: "rahul"}
        ];

        $scope.getFeedback = function () {
            $scope.isListAvailable = $scope.autoNumber.trim().length > 2;
            if (!tempResult)this.serverReq_get("/api/feedback/" + $scope.autoNumber.trim());
        };

        $scope.submitForm = function () {
            var data = {auto_number: $scope.auto_number,
                driver_name: $scope.driver_name,
                rating: ++count,
                feedback: [
                    {message: $scope.driver_feedback_msg, rating: ++count}
                ],
                driver_photo: $scope.driver_photo
            };

            $scope.serverReq_post("/api/feedback", data)
        };

        $scope.setRating = function (event) {
            count = parseInt(event.target.className.match(/rating_\d/)[0].match(/\d/)[0]);
            $("form span.rating").removeClass("active");
            for (var i = 0; i <= count; i++) {
//                $scope.rating_[i] = "active";  todo : need to find a better to way to solve this problem
                $("span.rating_" + i).addClass("active");
            }
        };

        /**
         *  This will be taken up later
         * */
        $scope.monitorChanges = function (model) {
            $scope.$watch(model, function (newValue, oldValue) {
            })
        };

        $scope.serverReq_get = function (api) {
            tempResult = true;
            $http.get(api)
                .success(function (response) {
                    $scope.result.data = response;
                    $scope.result.type = "success";
                    $scope.autoNumbers = response;
                    tempResult = false;
                })
                .error(function (response) {
                    $scope.result.data = response;
                    $scope.result.type = "error";
                    tempResult = false;
                });
        };

        $scope.serverReq_post = function (api, params) {
            tempResult = true;
            $http.post(api, {data: params})
                .success(function (response) {
                    console.log(response);
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
            }
        }

    });
