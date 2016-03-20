import {App} from './app/app.react'
import {Dashboard} from './dashboard/dashboard.react'
import {Route, IndexRoute} from 'react-router'
import React from 'react'

export default  (
  <Route component={App} path="/" >
    <IndexRoute component={Dashboard} />
  </Route>
)
