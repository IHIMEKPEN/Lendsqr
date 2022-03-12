'use strict';

var toInteger = require('to-integer');

var MAX_ARRAY_LENGTH = 4294967295;

module.exports = function (value) {

  if (value) {

    var length = toInteger(value);

    if (isNaN(length)) {
      return 0;
    }

    if (length === Number.MIN_VALUE) {
      return 0;
    } else if (length === Number.MAX_VALUE) {
      return MAX_ARRAY_LENGTH;
    }

    length = length <= MAX_ARRAY_LENGTH ? length : MAX_ARRAY_LENGTH;
    length = length >= 0 ? length : 0;

    return length;
  }

  return 0;
};
