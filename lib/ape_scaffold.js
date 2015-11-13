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

const argx = require('argx'),
    async = require('async'),
    path = require('path'),
    filemode = require('filemode'),
    askconfig = require('askconfig'),
    fs = require('fs'),
    util = require('util'),
    render = require('./render'),
    extend = require('extend'),
    gitconfig = require('gitconfig');

const tmpl = path.resolve(__dirname, '../asset/tmpl');

/** @lends apeScaffold */
function apeScaffold(dest, options, callback) {
    let args = argx(arguments);
    callback = args.pop('function');
    options = args.pop('object');
    dest = args.shift('string');
    fs.exists(dest, (exists)=> {
        let skip = exists && !options.force;
        if (skip) {
            callback(_skipError(dest));
            return;
        }
        async.waterfall([
            function (callback) {
                gitconfig.get('user', callback);
            },
            function (user, callback) {
                user = user || {name: '__user_name__'};
                async.waterfall([
                    function (callback) {
                        let config = {
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
                        let config = extend({}, {
                            author_name: user.name,
                            author_email: user.email,
                            author_url: user.url
                        }, asked);
                        async.series([
                            (callback) => {
                                render(tmpl, dest, config, {
                                    silent: options.silent
                                }, callback);
                            },
                            (callback) => {
                                async.series([
                                    function (callback) {
                                        let bins = path.join(dest, 'ci/*.*');
                                        filemode(bins, '755', callback);
                                    }
                                ], (err) => {
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
    let msg = util.format('%s is already exists. Use -f option to force.', dest);
    return new Error(msg);
}

module.exports = apeScaffold;
