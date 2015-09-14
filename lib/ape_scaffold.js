/**
 * @function apeScaffold
 * @param {string} dest - Destination file path.
 * @param {object} options - Optional settings.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    async = require('async'),
    askconfig = require('askconfig'),
    gitUser = require('./git_user');

/** @lends apeScaffold */
function apeScaffold(dest, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function');
    options = args.pop('object');
    dest = args.shift('string');


}

module.exports = apeScaffold;
