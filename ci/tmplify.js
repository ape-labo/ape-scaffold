#!/usr/bin/env node

/**
 * Tmplify prototype.
 */

"use strict";

process.chdir(__dirname + '/..');

var apeTasking = require('ape-tasking'),
    tmplconv = require('tmplconv');

apeTasking.runTasks('tmplify', [
    (callback)=> {
        tmplconv.tmplify('asset/prototype', 'asset/tmpl', {
            clean: true,
            mode: '444',
            pattern: [
                '**/*.*',
                '.*',
                '+(test|lib)/**/.*.bud'
            ],
            ignore: [
                '.DS_Store',
                '.svg'
            ],
            data: {
                'github_repository': "my-wonderful-repo/my-awesome-pkg",
                'package_name': 'my-awesome-pkg',
                'package_description': 'This is my awesome package.',
                'author_name': 'Taka Okunishi',
                'author_email': 'okunishitaka.com@gmail.com',
                'author_url': 'http://okunishitaka.com'
            }
        }, callback);
    }
], true);
