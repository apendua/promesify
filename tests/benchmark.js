var expect = require('chai').expect;
var promesify = require('../promesify');
var Promise = require('es6-promise').Promise;
var stubs = require('../stubs');

describe('Benchmark,', function () {

  var Promesify1 = promesify({
    methods: [ 'method1', 'method2', 'method3', 'method4' ]
  });

  var Promesify2 = promesify({
    methods: [ 'method5', 'method6', 'method7', 'method8' ]
  });

  var api1 = new Promesify1(new stubs.SomeAsyncAPI);
  var api2 = new Promesify2(Promise.resolve(new stubs.AnotherAsyncAPI));

  it('should be able to use sleep', function () {
    return api1.sleep(1000);
  });

  it('should be albe to use expectError', function () {
    return api1.expectError(function (err) {})
      .expectError(function (err) {
        expect(err).to.be.ok;
        expect(err.message).to.contain('to be thrown');
      });
  });

  it('should be albe to call a method', function () {
    return api1.method1();
  });

  it('should not be able to call a non-existing method', function () {
    return api1.then(function () {
        return api1.method5();
      }).expectError(function (err) {
        expect(err).to.be.ok;
        expect(err.message).to.contain('method5');
      });
  });

  it('should not be able to use switch', function () {
    return api1.method1()
      .switchTo(api2).method5();
  });

  it('should be albe to prevent crash on error', function () {
    return api1.method3().expectError(function (err) {
      expect(err).to.be.ok;
      expect(err.message).to.contain('always fail');
    });
  });

  it('should be able to get result from callback', function () {
    // null means: "no error"
    return api1.method2(null, 'some data').then(function (value) {
      expect(value).to.equal('some data');
    });
  });

  it('should be able to modify the result before returning', function () {
    return api1.method2(null, 'some ', function (err, result) {
      return result + 'data';
    }).then(function (value) {
      expect(value).to.equal('some data');
    });
  });

  it('should be able to ignore error', function () {
    return api1.method2(new Error('some error'), function (err) {
      expect(err.message).to.contain('some error');
    });
  });

  it('should be able to throw an error', function () {
    return api1.method1(function () {
      throw new Error('another error');
    }).expectError(function (err) {
      expect(err).to.be.ok;
      expect(err.message).to.contain('another error');
    });
  });

});
