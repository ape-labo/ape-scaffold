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
            gitconifg.get('user', function(err, user){
                callback(err, user || {
                        name:'__user_name__'
                    })
            });
        }
    ], callback);
}

module.exports = gitUser;