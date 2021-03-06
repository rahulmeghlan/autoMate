'use strict';

angular.module('angularFullstackApp')
    .controller('FeedbackCtrl', function ($rootScope, $scope, backEnd) {
        var count = 0;
        $scope.isListAvailable = false; // boolean to show/hide the list of auto-numbers
        $scope.isNewEntry = false; // boolean to show/hide the new-feedback form
        $scope.isSubmitted = false; //boolean to disable/enable submit button

        $scope.getFeedback = function () {
            $scope.isListAvailable = $scope.autoNumber.trim().length > 2;
            if ($scope.isListAvailable) {
                backEnd.serverReq_get("/api/feedback/" + $scope.autoNumber.trim() + '?resultType=short', {
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
            }
        };

        $scope.submitForm = function () {
            if ($rootScope.isValidationError) {

                return false;
            }
            $scope.isSubmitted = true;
            var reader = new FileReader(),
                data = {};
            reader.onload = function (e) {
                data = {auto_number: $scope.auto_number,
                    driver_name: $scope.driver_name,
                    rating: ++count,
                    feedback: [
                        {message: $scope.driver_feedback_msg, rating: count}
                    ],
                    driver_photo: reader.result
                };
                // todo : implement promise here
                backEnd.serverReq_post("/api/feedback", data, {
                    success: function (response) {
                        var img = new Image();
                        img.src = response.driver_photo;
                        $("body").append(img);
                        $scope.isNewEntry = false;
                    },
                    error: function (response) {

                    }
                });
            };
            reader.readAsDataURL($scope.driver_photo);
            /*
             * Send the data calculated from above to the BE API
             * */

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

        $scope.createDatabase = function () {
            for (var i = 0; i < $scope.autoNumbers.length; i++) {
                this.serverReq_post("/api/feedback", $scope.autoNumbers[i]);
            }
        };
        /*
         * Private method to update the form with the inputs.
         * */
        $scope.updateForm = function () {
            $scope.auto_number = $scope.autoNumber;
            $(".search_auto").blur();
        };

    });
