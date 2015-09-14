/**
 * @function apeScaffold
 * @param {string} dest - Destination file path.
 * @param {object} options - Optional settings.
 * @param {boolean} [options.straight=false] - No asking.
 * @param {function} callback - Callback when done.
 */

"use strict";

var argx = require('argx'),
    async = require('async'),
    path = require('path'),
    tmplconv = require('tmplconv'),
    askconfig = require('askconfig'),
    stringcase = require('stringcase'),
    extend = require('extend'),
    gitUser = require('./git_user');

var tmpl = path.resolve(__dirname, '../asset/tmpl');

/** @lends apeScaffold */
function apeScaffold(dest, options, callback) {
    var args = argx(arguments);
    callback = args.pop('function');
    options = args.pop('object');
    dest = args.shift('string');

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
                    tmplconv.render(tmpl, dest, {
                        silent: options.silent,
                        clean: options.clean,
                        once: options.once,
                        data: config
                    }, callback);
                }
            ], callback);
        }
    ], callback);


}

module.exports = apeScaffold;
