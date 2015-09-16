/**
 * Get git user data.
 * @function gitUser
 * @param {function} callback - Callback when done.
 */

"use strict";

var async = require('async'),
    gitconfig = require('gitconfig');

function gitUser(callback) {
    async.waterfall([
        function (callback) {
            gitconfig.get('user', function(err, user){
                callback(err, user || {
                        name:'__user_name__'
                    })
            });
        }
    ], callback);
}

module.exports = gitUser;