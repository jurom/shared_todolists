/* eslint-disable no-var */

// prepares global environment for everything that'll be ran.
// This means, it:
// - registers babel so we can use es6 and es7 features
// - promisifies some apis
// - requires 'polyfill' needed for extensible_destructuring to work
// - ignores webpack custom loaders on server

require('babel-register')(require('./babelconf'))
require('./src/common/destructuring')

var fs = require('fs')
var childProcess = require('child_process')
var Promise = require('bluebird')

Promise.promisifyAll(fs)
Promise.promisifyAll(childProcess)
// Load and use polyfill for ECMA-402.
if (!global.Intl) { global.Intl = require('intl') }

// To ignore webpack custom loaders on server.
['css', 'less', 'sass', 'scss', 'styl'].forEach(function(ext) {
  require.extensions['.' + ext] = function() {}
})
