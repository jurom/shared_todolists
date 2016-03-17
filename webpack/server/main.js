import webpack from 'webpack'
import webpackDev from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'
import express from 'express'

export const webpackDevServer = (webpackConfig) => (callback) => {
  const app = express()

  const compiler = webpack(webpackConfig)

  app.use(webpackDev(compiler, {
    headers: {'Access-Control-Allow-Origin': '*'},
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(webpackHot(compiler))

  app.listen(webpackConfig.hotPort, () => {
    console.log('Hot server started at port %d', webpackConfig.hotPort) // eslint-disable-line no-console
    callback()
  })
}
