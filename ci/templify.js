#!/usr/bin/env

/**
 * Tmplify prototype.
 */

"use strict";

process.chdir(__dirname + '/..');

var apeTasking = require('ape-tasking'),
    tmplconv = require('tmplconv');

apeTasking.runTasks('tmplify', [
    function (callback) {
        tmplconv.tmplify('asset/prototype', 'asset/tmpl', {
            clean: true,
            mode:'444',
            data: {
                'package-name': 'my-awesome-pkg',
                'github-repository': "my-wonderful-repo/my-wonderful-repo",
                'author-name': 'Taka Okunishi',
                'email': 'okunishitaka.com@gmail.com',
                'author-url':'http://okunishitaka.com'
            }
        }, callback);
    }
], true);
