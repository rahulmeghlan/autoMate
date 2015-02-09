'use strict';

angular.module('angularFullstackApp')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            template: '<div></div>',
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind("change", function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);