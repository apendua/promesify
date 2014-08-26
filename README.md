# promesify [![Build Status](https://travis-ci.org/apendua/promesify.svg?branch=master)](https://travis-ci.org/apendua/promesify)

Suppose you have some asynchronous callback-based API, which you want to use but you like promises. This is where `promesify` becomes handy. So lets say you have some API object

```javascript
myApi = new SuperDuperApi();
```
Now instead of doing this:
```javascript
myApi.method1(function (err) {
  if (err) return;
  myApi.method2(function (err) {
    if (err) return;
    myApi.method3(function (err) {
      // and so on ...
    });
  });
});
```
thanks to `promesify` you can be a little smarter:
```javascript
var Promesify = promesify({
  methods: [ 'method1', 'method2', 'method3', /* ... */ ]
});
myApi = new Promesify(myApi);
myApi.method1().method2().method3().catch(function (err) {
  console.log('something went wrong');
});
```
