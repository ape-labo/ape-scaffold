/**
 * Test for index.js
 */

'use strict'

const index = require('../lib/index.js')
const assert = require('assert')

describe('index', () => {
  it('Eval properties.', (done) => {
    assert.ok(index)
    assert.ok(index.version)
    done()
  })
})

/* global describe, it */
