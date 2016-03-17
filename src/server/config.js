const env = process.env.env || 'devel'

const config = {
  env: env,
  version: require('../../package').version,
  useWebpackDevServer: true,
  presentedHost: 'http://localhost:8000',
  port: 8000,
  hotPort: 8888,
}

export default config
