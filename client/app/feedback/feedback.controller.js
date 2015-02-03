'use strict';

angular.module('angularFullstackApp')
    .controller('FeedbackCtrl', function ($rootScope, $scope, $http) {
        var count = 0;
        $scope.isListAvailable = false; // boolean to show/hide the list of auto-numbers
        $scope.isNewEntry = false; // boolean to show/hide the new-feedback form

        $scope.getFeedback = function () {
            var _this = this;
            $scope.isListAvailable = $scope.autoNumber.trim().length > 2;
            this.serverReq_get("/api/feedback/" + $scope.autoNumber.trim(), {
                success: function (response) {
                    $scope.autoNumbers = response;
                    $scope.isNewEntry = !(response.length);
                    if ($scope.isNewEntry) {
                        $rootScope.showAlert = true;
                        $scope.updateForm();
                    }
                },
                error: function (response) {
                }
            });
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
            /*
             * Send the data calculated from above to the BE API
             * */
            $scope.serverReq_post("/api/feedback", data, {
                success: function (response) {
                    $scope.autoNumbers = response;
                },
                error: function (response) {

                }
            })
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

        $scope.serverReq_get = function (api, callBacks) {
            $http.get(api)
                .success(function (response) {
                    callBacks.success(response);
                })
                .error(function (response) {
                    callBacks.error(response);
                });
        };

        $scope.serverReq_post = function (api, params, callBacks) {
            $http.post(api, {data: params})
                .success(function (response) {
                    callBacks.success(response)
                })
                .error(function (response) {
                });
        };

        $scope.createDatabase = function () {
            for (var i = 0; i < $scope.autoNumbers.length; i++) {
                this.serverReq_post("/api/feedback", $scope.autoNumbers[i]);
            }
        };

        /*
         * Private Methods
         * */

        /*
         * Private method to update the form with the inputs.
         * */
        $scope.updateForm = function () {
            $scope.auto_number = $scope.autoNumber;
            $(".search_auto").blur();
        };


    });
