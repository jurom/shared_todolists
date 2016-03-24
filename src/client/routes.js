import {App} from './app/app.react'
import {Dashboard} from './dashboard/dashboard.react'
import {Login} from './auth/login.react'
import {Signup} from './auth/signup.react'
import {Route, IndexRoute} from 'react-router'
import {FindFriends} from './friends/find.react'
import {FriendList} from './friends/list.react'
import {Friends} from './friends/friends.react'
import {Requests} from './friends/requests.react'
import {redirect} from './helpers/redirect.react'
import React from 'react'

export default  (
  <Route component={App} path="/" >
    <IndexRoute component={redirect('/dashboard')} />
    <Route component={Dashboard} path="/dashboard">
      <IndexRoute component={redirect('/dashboard/friends')} />
      <Route component={Friends} path="friends">
        <IndexRoute component={redirect('/dashboard/friends/list')} />
        <Route component={Requests} path="requests" />
        <Route component={FindFriends} path="findfriends" />
        <Route component={FriendList} path="list" />
      </Route>
    </Route>
    <Route component={Login} path="/login" />
    <Route component={Signup} path="/signup" />
  </Route>
)
