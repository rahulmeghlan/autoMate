'use strict';

describe('Service: backEnd', function () {

  // load the service's module
  beforeEach(module('angularFullstackApp'));

  // instantiate service
  var backEnd;
  beforeEach(inject(function (_backEnd_) {
    backEnd = _backEnd_;
  }));

  it('should do something', function () {
    expect(!!backEnd).toBe(true);
  });

});
