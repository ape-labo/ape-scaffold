/**
 * Two way template converter.
 * @module ape-scaffold
 * @version 1.2.11
 */

"use strict";

var apeScaffold = require('./ape_scaffold'),
    pkg = require('../package.json');

var lib = apeScaffold.bind(this);
lib.version = pkg.version;
lib.apeScaffold = apeScaffold;

module.exports = lib;