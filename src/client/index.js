import ReactDOM from 'react-dom'
import React from 'react'
import {Router, browserHistory} from 'react-router'
import routes from './routes'

const app = document.getElementById('app')

ReactDOM.render(
  <Router history={browserHistory}>
    {routes}
  </Router>, app
)
