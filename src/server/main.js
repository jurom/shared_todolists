import express from 'express'
import frontend from './frontend'
import {Server} from 'http'
import {Promise} from 'bluebird'

/*
 * Runs server with custom config. Returns {handler, started}.
 *   handler - result of server.listen() call. Call handler.close() to stop the express server
 *   started - promise fullfilling on server start
 */
export function runServerConfig(config) {

  const app = express()
  const server = Server(app)

  // Load react-js frontend.
  app.use(frontend)

  return new Promise((resolve, reject) => {
    server.listen(config.port, '127.0.0.1', () => {
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

