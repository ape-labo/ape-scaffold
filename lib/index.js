/**
 * Two way template converter.
 * @module ape-scaffold
 * @version 3.1.8
 */

'use strict'

const apeScaffold = require('./ape_scaffold')
const pkg = require('../package.json')

let lib = apeScaffold.bind(this)

Object.assign(lib, {
  apeScaffold,
  version: pkg.version
})

module.exports = lib
