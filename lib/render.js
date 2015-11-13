/**
 * @function render
 */

"use strict";

const tmplconv = require('tmplconv');

/** @lends render */
function render(tmpl, dest, config, options, callback) {
    tmplconv.render(tmpl, dest, {
        silent: options.silent,
        pattern: [
            '**/*.*',
            '.*',
            '**/.*.bud.tmpl'
        ],
        ignore: [
            '.DS_Store',
            '.svg'
        ],
        clean: false,
        once: false,
        data: config
    }, callback);
}

module.exports = render;
