'use strict';

describe('Controller: FeedbackItemCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullstackApp'));

  var FeedbackItemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeedbackItemCtrl = $controller('FeedbackItemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
