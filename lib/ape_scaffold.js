/**
 * @function apeScaffold
 * @param {string} dest - Destination file path.
 * @param {object} options - Optional settings.
 * @param {boolean} [options.straight=false] - No asking.
 * @param {boolean} [options.force=false] - Force to generate scaffold.
 * @param {boolean} [options.silent=false] - Disable logs.
 * @returns {Promise}
 */

'use strict'

const argx = require('argx')
const path = require('path')
const filemode = require('filemode')
const askconfig = require('askconfig')
const fs = require('fs')
const render = require('./render')
const co = require('co')
const gitconfig = require('gitconfig')

const tmpl = path.resolve(__dirname, '../asset/tmpl')

/** @lends apeScaffold */
function apeScaffold (dest, options) {
  let args = argx(arguments)
  if (args.pop('function')) {
    throw new Error('Callback is no longer supported. Use promise interface instead.')
  }
  options = args.pop('object')
  dest = args.shift('string')
  return co(function * () {
    let exists = yield new Promise((resolve) =>
      fs.exists(dest, (exists) => resolve(exists))
    )
    let skip = exists && !options.force
    if (skip) {
      throw new Error(`${dest} is already exists. Use -f option to force.`)
    }
    let user = yield new Promise((resolve, reject) =>
      gitconfig.get('user', (err, user) => err ? reject(err) : resolve(user))
    )
    user = user || { name: '__user_name__' }
    let defaults = {
      package_name: path.basename(dest),
      package_description: '',
      github_repository: user.name + '/' + path.basename(dest)
    }
    let config
    if (options.straight) {
      config = Object.assign(defaults)
    } else {
      config = yield askconfig(defaults)
    }
    let data = Object.assign({}, {
      author_name: user.name,
      author_email: user.email,
      author_url: user.url
    }, config)
    yield render(tmpl, dest, data, {
      silent: options.silent
    })
    let bins = path.join(dest, 'ci/*.*')
    yield filemode(bins, '755')
  })
}

module.exports = apeScaffold
