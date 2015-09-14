/**
 * Get git user data.
 * @function gitUser
 * @param {function} callback - Callback when done.
 */

"use strict";

var async = require('async'),
    os = require('os'),
    arrayfilter = require('arrayfilter'),
    childProcess = require('child_process');

function gitUser(callback) {
    async.waterfall([
        function (callback) {
            childProcess.exec('git config --global -l', callback);
        },
        function (gitConfigs) {
            var user = {};
            gitConfigs.split(os.EOL).filter(arrayfilter.patternAccept(/^user\./)).forEach(function (config) {
                var components = config.split('=');
                var key = components.shift().split(/\./).pop();
                user[key] = components.pop();
            });
            callback(null, user);
        }
    ], callback);
}

module.exports = gitUser;