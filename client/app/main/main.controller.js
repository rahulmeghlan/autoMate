'use strict';

angular.module('angularFullstackApp')
    .controller('MainCtrl', function ($scope, $http, socket) {
        $scope.isListAvailable = false; //this will not show the empty results list

        $scope.searchByAutoNumber = function () {
            $http.get("/api/feedback/" + $scope.autoNumber.trim() + '?resultType=short').
                success(function (response) {
                    $scope.autoNumbers = response;
                    $scope.isListAvailable = true;
                    /*$scope.isNewEntry = !(response.length);
                     if ($scope.isNewEntry) {
                     $rootScope.showAlert = true;
                     $scope.updateForm();
                     }*/
                }).
                error(function (response) {
                    $scope.isListAvailable = false;
                });
        };

        /*
         * This is the area coming from scaffolding, keep this thing intact for future references
         * */
        /*$scope.awesomeThings = [];

         $http.get('/api/things').success(function (awesomeThings) {
         $scope.awesomeThings = awesomeThings;
         socket.syncUpdates('thing', $scope.awesomeThings);
         });

         $scope.addThing = function () {
         if ($scope.newThing === '') {
         return;
         }
         $http.post('/api/things', { name: $scope.newThing });
         $scope.newThing = '';
         };

         $scope.deleteThing = function (thing) {
         $http.delete('/api/things/' + thing._id);
         };

         $scope.$on('$destroy', function () {
         socket.unsyncUpdates('thing');
         });*/
    });
