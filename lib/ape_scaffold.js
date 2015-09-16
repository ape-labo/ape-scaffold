/**
 * @function apeScaffold
 * @param {string} dest - Destination file path.
 * @param {object} options - Optional settings.
 * @param {boolean} [options.straight=false] - No asking.
 * @param {boolean} [options.force=false] - Force to generate scaffold.
 * @param {boolean} [options.silent=false] - Disable logs.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    async = require('async'),
    path = require('path'),
    tmplconv = require('tmplconv'),
    askconfig = require('askconfig'),
    stringcase = require('stringcase'),
    fs = require('fs'),
    util = require('util'),
    render = require('./render'),
    extend = require('extend'),
    gitUser = require('./git_user'),
    filemode = require('./filemode');

var tmpl = path.resolve(__dirname, '../asset/tmpl');

/** @lends apeScaffold */
function apeScaffold(dest, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function');
    options = args.pop('object');
    dest = args.shift('string');
    fs.exists(dest, function (exists) {
        var skip = exists && !options.force;
        if (skip) {
            callback(_skipError(dest));
            return;
        }
        async.waterfall([
            function (callback) {
                gitUser(callback);
            },
            function (user, callback) {
                async.waterfall([
                    function (callback) {
                        var config = {
                            package_name: path.basename(dest),
                            package_description: '',
                            github_repository: user.name + '/' + path.basename(dest)
                        };
                        if (options.straight) {
                            callback(null, config);
                        } else {
                            askconfig(config, callback);
                        }
                    },
                    function (asked, callback) {
                        var config = extend({}, {
                            author_name: user.name,
                            author_email: user.email,
                            author_url: user.url
                        }, asked);
                        async.series([
                            function (callback) {
                                render(tmpl, dest, config, {
                                    silent: options.silent
                                }, callback);
                            },
                            function (callback) {
                                async.series([
                                    function (callback) {
                                        var bins = path.join(dest, 'ci/*.*');
                                        filemode(bins, '755', callback);
                                    }
                                ], function (err) {
                                    callback(err);
                                });
                            }
                        ], callback);
                    }
                ], callback);
            }
        ], callback);
    });
}

function _skipError(dest) {
    var msg = util.format('%s is already exists. Use -f option to force.', dest);
    return new Error(msg);
}

module.exports = apeScaffold;
