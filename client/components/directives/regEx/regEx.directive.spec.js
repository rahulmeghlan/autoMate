'use strict';

describe('Directive: regEx', function () {

  // load the directive's module
  beforeEach(module('angularFullstackApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<reg-ex></reg-ex>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the regEx directive');
  }));
});