require('../common/destructuring')

import ReactDOM from 'react-dom'
import React from 'react'
import {Router, browserHistory} from 'react-router'
import routes from './routes'
import {IntlProvider} from 'react-intl'

const app = document.getElementById('app')

ReactDOM.render(
  <IntlProvider locale="en">
    <Router history={browserHistory}>
      {routes}
    </Router>
  </IntlProvider>, app
)
