/**
 * Change file permissions.
 * @function filemode
 * @param {string} filename - Glob file name pattern.
 * @param {string} mode - File permission mode.
 * @param {function callback - Callback when done.
 */

"use strict";

var async = require('async'),
    fs = require('fs'),
    expandglob = require('expandglob');

/** @lends filemode */
function filemode(filename, mode, callback) {
    async.waterfall([
        function (callback) {
            expandglob(filename, callback);
        },
        function (filenames, callback) {
            async.eachSeries(filenames, function (filename, callback) {
                fs.chmod(filename, mode, callback);
            }, callback);
        }
    ], callback);
}

module.exports = filemode;
