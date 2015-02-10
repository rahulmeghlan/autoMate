'use strict';

angular.module('angularFullstackApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/feedback', {
                templateUrl: 'app/feedback/feedback.html',
                controller: 'FeedbackCtrl'
            })
            .when('/feedback/:id', {
                templateUrl: 'app/feedback_item/feedback_item.html',
                controller: 'FeedbackItemCtrl'
            });
    });
