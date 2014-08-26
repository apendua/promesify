var EventEmitter = require('events').EventEmitter;
var util = require('util');

exports.SomeAsyncAPI = SomeAsyncAPI;
exports.AnotherAsyncAPI = AnotherAsyncAPI;

function SomeAsyncAPI() {
  EventEmitter.call(this);
}

util.inherits(SomeAsyncAPI, EventEmitter);

SomeAsyncAPI.prototype.method1 = function (callback) {
  setTimeout(callback, 10);
}

SomeAsyncAPI.prototype.method2 = function () {
  var args = Array.prototype.slice.call(arguments, 0), callback = args.pop();
  setTimeout(function () {
    callback.apply({}, args);
  }, 10);
}

SomeAsyncAPI.prototype.method3 = function (callback) {
  var self = this;
  setTimeout(function () {
    // TODO: how can we handle emitted error?
    //self.emit('error', new Error('it should always fail'));
    callback(new Error('it should always fail'));
  }, 100);
}

SomeAsyncAPI.prototype.method4 = function (callback) {
  setTimeout(callback, 1000);
}

function AnotherAsyncAPI() {
}

AnotherAsyncAPI.prototype.method5 = function (callback) {
  setTimeout(callback, 10);
}

AnotherAsyncAPI.prototype.method6 = function () {
  var args = Array.prototype.slice.call(arguments, 0), callback = args.pop();
  setTimeout(function () {
    callback.apply({}, args);
  }, 10);
}

AnotherAsyncAPI.prototype.method7 = function (callback) {
  setTimeout(callback, 100);
}

AnotherAsyncAPI.prototype.method8 = function (callback) {
  setTimeout(callback, 1000);
}
