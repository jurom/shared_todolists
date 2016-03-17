import compression from 'compression'
import express from 'express'
import render from './render'

const app = express()

app.use(compression())

app.use('/build', express.static('build'))
app.use('/assets', express.static('assets'))

app.get('*', (req, res, next) => {
  render(req, res).catch(next)
})

app.on('mount', () => {
  console.log('App is available at %s', app.mountpath)
})

export default app
