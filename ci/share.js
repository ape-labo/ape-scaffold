#!/usr/bin/env node

/**
 * Share this project.
 */

'use strict'

process.chdir(`${__dirname}/..`)

const { runTasks, execcli } = require('ape-tasking')
const pkg = require('../package.json')

runTasks('share', [
  () => execcli('hub', [ 'init' ]),
  () => execcli('hub', [ 'create', { d: pkg.description }, pkg.repository ]),
  () => execcli('travis', [ 'enable', { r: pkg.repository } ])
], true)
