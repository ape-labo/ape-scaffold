/**
 * Test for index.js
 */

"use strict";

var index = require('../lib/index.js');

exports['Eval properties.'] = function(test){
    test.ok(index);
    test.ok(index.version);
    test.done();
};