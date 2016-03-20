import merge from 'deepmerge'

const env = process.env.env || 'devel'

const configBase = {
  env: env,
  version: require('../../package').version,
  hotPort: 8888,
}

const configEnv = {
  devel: {
    presentedHost: 'http://localhost:8000',
    port: 8000,
    useWebpackDevServer: true,
  },
  heroku: {
    presentedHost: 'https://infinite-shelf-71200.herokuapp.com/',
    port: process.env.PORT,
    useWebpackDevServer: false,
  }
}

export default merge(configBase, configEnv[env])
