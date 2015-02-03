'use strict';

angular.module('angularFullstackApp')
    .controller('AlertCtrl', function ($rootScope, $scope, $location, Auth) {
        /*
         * Any Code which might be required in the footer section
         * */
        $scope.hideAlert = function () {
            $rootScope.showAlert = false;
            $("#autoNumber").focus();
        }
    });