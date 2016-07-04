#!/usr/bin/env node

/**
 * Measure test coverage.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks } = require('ape-tasking')
const apeCovering = require('ape-covering')

runTasks('cover', [
  () => apeCovering.measureCoverage('_mocha', [
    'test/*_test.js', '-t', 30000
  ], {
    dir: 'coverage'
  })
], true)
