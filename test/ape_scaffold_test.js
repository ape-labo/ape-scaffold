/**
 * Test case for apeScaffold.
 * Runs with mocha.
 */
'use strict'

const apeScaffold = require('../lib/ape_scaffold.js')
const assert = require('assert')
const co = require('co')
const fs = require('fs')

const tmpDir = `${__dirname}/../tmp`

describe('ape-scaffold', () => {
  before(() => co(function * () {
  }))
  after(() => co(function * () {
  }))

  it('Apply scaffold', () => co(function * () {
    yield apeScaffold(`${tmpDir}/foo/bar`, {
      straight: true,
      force: true
    })
    assert.ok(
      fs.existsSync(`${tmpDir}/foo/bar`)
    )
  }))
})

/* global describe, before, after, it */
