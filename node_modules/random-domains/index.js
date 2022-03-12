'use strict';

var clamp       = require('clamp');
var randomTld   = require('random-tld');
var randomLorem = require('random-lorem');

module.exports = function (options) {

  options = options || { level: 1 };

  if (!options.tld) {
    options.tld = randomTld();
  }

  var level = clamp(options.level || 1, 1, 10);
  var parts = [];

  while (level--) {
    parts.push(randomLorem());
  }

  parts.push(options.tld);

  return parts.join('.');
};
