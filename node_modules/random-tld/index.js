'use strict';

var tlds     = require('tld-list');
var pickItem = require('pick-item');

module.exports = function () {
  return pickItem(tlds);
};
