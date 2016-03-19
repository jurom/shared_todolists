import merge from 'deepmerge'

const env = process.env.env || 'devel'

const configBase = {
  env: env,
  version: require('../../package').version,
  useWebpackDevServer: true,
  presentedHost: 'http://localhost:8000',
  port: 8000,
  hotPort: 8888,
}

const configEnv = {
  devel: {},
  heroku: {
    presentedHost: 'https://infinite-shelf-71200.herokuapp.com/',
    port: process.env.PORT,
    useWebpackDevServer: false
  }
}

export default merge(configBase, configEnv[env])
