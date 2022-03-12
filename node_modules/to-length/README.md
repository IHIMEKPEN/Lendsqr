# to-length

> Converts value to an integer suitable for use as the length of an array-like object. 


[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/gearcase/to-length/blob/master/LICENSE)

[![build:?](https://img.shields.io/travis/gearcase/to-length/master.svg?style=flat-square)](https://travis-ci.org/gearcase/to-length)
[![coverage:?](https://img.shields.io/coveralls/gearcase/to-length/master.svg?style=flat-square)](https://coveralls.io/github/gearcase/to-length)


## Install

```
$ npm install --save to-length 
```

## Usage

> For more use-cases see the [tests](https://github.com/gearcase/to-length/blob/master/test/spec/index.js)

```js
var toLength = require('to-length');

toLength(3);                // => 3
toLength('3');              // => 3
toLength('abc');            // => 0
toLength(-2);               // => 0
toLength();                 // => 0
toLength(null);             // => 0
toLength(Number.MIN_VALUE); // => 0
toLength(Number.MAX_VALUE); // => 4294967295
toLength(Infinity);         // => 4294967295

// boolean
toLength(true);  // => 1
toLength(false); // => 0
```


## Related

- [is-length](https://github.com/gearcase/is-length) - Checks if the given value is a valid array-like length.
- [is-index](https://github.com/gearcase/is-index) - Checks if the given value is a valid array-like index.
- [drop-left](https://github.com/gearcase/drop-left) - Creates a slice of array with n elements dropped from the beginning.
- [drop-right](https://github.com/gearcase/drop-right) - Creates a slice of array with n elements dropped from the end.
- [pick-item](https://github.com/mock-end/pick-item) - Randomly sampling a item from an array.
- [pick-items](https://github.com/mock-end/pick-items) - Randomly sampling some items from an array. 
- [shuffle-arr](https://github.com/mock-end/shuffle-arr) - Randomize the order of the elements in an array or array-like object. 
- [is-array-like](https://github.com/gearcase/is-array-like) - Checks if the given value is an array or array-like object.



## Contributing

Pull requests and stars are highly welcome.

For bugs and feature requests, please [create an issue](https://github.com/gearcase/to-length/issues/new).
