'use strict';

angular.module('angularFullstackApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/feedback', {
        templateUrl: 'app/feedback/feedback.html',
        controller: 'FeedbackCtrl'
      });
  });
