import express from 'express'
import frontend from './frontend'
import {Promise} from 'bluebird'

/*
 * Runs server with custom config. Returns {handler, started}.
 *   handler - result of server.listen() call. Call handler.close() to stop the express server
 *   started - promise fullfilling on server start
 */
export function runServerConfig(config) {

  const app = express()

  // Load react-js frontend.
  app.use(frontend)

  return new Promise((resolve, reject) => {
    app.listen(config.port, '0.0.0.0', 511, () => {
      console.log('Server started at port %s', config.port)
      resolve(null)
    })
  })
}

/*
 * Runs server with config specified by the `env` variable
 */

export function runServer() {
  let config = require('./config').default
  console.log('Running server with env: ', config.env)
  return runServerConfig(config)
}

