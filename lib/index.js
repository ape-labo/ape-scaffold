/**
 * Two way template converter.
 * @module ape-scaffold
 * @version 3.0.0
 */

'use strict'

const apeScaffold = require('./ape_scaffold')
const pkg = require('../package.json')

let lib = apeScaffold.bind(this)
lib.version = pkg.version
lib.apeScaffold = apeScaffold

module.exports = lib
