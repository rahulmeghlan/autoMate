'use strict';

angular.module('angularFullstackApp')
    .directive('regEx', function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var regEx_name = attrs.regEx,
                    regEx = /^$/;
                switch (regEx_name) {
                    //todo: this is the place to app reg-Exs
                    case "reg_auto_number":
                        regEx = /^([a-z]{2}\d{2}[a-z]{1,2}\d{4})$/ig;
                        break;
                }

                element.bind('keyup focus', function () {
                    //todo : refactor the below statements further
                    if (!element.hasClass("error")) {
                        element.addClass("error");
                        $rootScope.isValidationError = true;
                    }
                    if (regEx.test(element.val())) {
                        element.removeClass("error");
                        $rootScope.isValidationError = false;
                    }
                });
            }
        };
    });