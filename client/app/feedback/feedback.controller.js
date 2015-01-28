'use strict';

angular.module('angularFullstackApp')
    .controller('FeedbackCtrl', function ($scope) {

        $scope.isListAvailable = false;
        $scope['autoNumbers'] = [
            {number: 'HR26AH1286', rating: 4},
            {number: 'HR26AH1286', rating: 3},
            {number: 'HR26AH1286', rating: 2},
            {number: 'HR26AH1286', rating: 1}
        ];

        $scope.getFeedback = function () {
            $scope.isListAvailable = $scope.autoNumber.trim().length > 2;
        };


    });
