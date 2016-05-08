/**
 * @function render
 */

'use strict'

const tmplconv = require('tmplconv')
const co = require('co')

/** @lends render */
function render (tmpl, dest, config, options = {}) {
  return co(function * () {
    return yield tmplconv.render(tmpl, dest, {
      silent: options.silent,
      pattern: [
        '**/*.*',
        '.*',
        '**/.*.bud.tmpl'
      ],
      ignore: [
        '.DS_Store',
        '.svg'
      ],
      clean: false,
      once: false,
      data: config
    })
  })
}

module.exports = render
