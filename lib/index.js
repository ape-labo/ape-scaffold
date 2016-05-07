/**
 * Two way template converter.
 * @module ape-scaffold
 * @version 2.0.3
 */

'use strict'

const apeScaffold = require('./ape_scaffold'),
    pkg = require('../package.json')

let lib = apeScaffold.bind(this)
lib.version = pkg.version;
lib.apeScaffold = apeScaffold;

module.exports = lib;
