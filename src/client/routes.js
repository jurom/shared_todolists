import {App} from './app/app.react'
import {Dashboard} from './dashboard/dashboard.react'
import {Login} from './auth/login.react'
import {Signup} from './auth/signup.react'
import {Route, IndexRoute} from 'react-router'
import React from 'react'

export default  (
  <Route component={App} path="/" >
    <IndexRoute component={Dashboard} />
    <Route component={Login} path="login" />
    <Route component={Signup} path="signup" />
  </Route>
)
