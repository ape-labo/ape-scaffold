/**
 * Get git user data.
 * @function gitUser
 * @param {function} callback - Callback when done.
 */

"use strict";

var async = require('async'),
    gitconifg = require('gitconifg');

function gitUser(callback) {
    async.waterfall([
        function (callback) {
            gitconifg.get('user', callback);
        }
    ], callback);
}

module.exports = gitUser;