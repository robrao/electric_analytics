'use strict';

describe('directives', function() {
  let $compile,
      $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('myApp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('foo has a quux', function() {
    // Compile a piece of HTML containing the directive
    var element = $compile("<foo></foo>")($rootScope);
    // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain(`<h4>foo</h4>
<p>bar</p>
<p>baz</p>`);
  });
});
