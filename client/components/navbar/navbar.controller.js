'use strict';

angular.module('angularFullstackApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth, $routeParams) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'Feedback',
                'link': '/feedback, /feedback/' + $routeParams.id     //note: the first link will be the default link always
            }
        ];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            var tempRoute = route.split(",");
            var isRoute = false;
            for (var i = 0; i < tempRoute.length; i++) {
                if (tempRoute[i].trim() === $location.path()) {
                    isRoute = true;
                    break;
                }
            }
            return isRoute;
//            return route === $location.path();
        };
    });