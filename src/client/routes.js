import {App} from './app/app.react'
import {Dashboard} from './dashboard/dashboard.react'
import {MyTasks} from './dashboard/mytasks.react'
import {Login} from './auth/login.react'
import {Signup} from './auth/signup.react'
import {Route, IndexRoute} from 'react-router'
import {FindFriends} from './friend/find.react'
import {FriendList} from './friend/list.react'
import {Friends} from './friend/friends.react'
import {Requests} from './friend/requests.react'
import {FriendDetail} from './friend/detail.react'
import {redirect} from './helpers/redirect.react'
import {Admin} from './admin/admin.react'
import React from 'react'

export default  (
  <Route component={App} path="/" >
    <IndexRoute component={redirect('/dashboard')} />
    <Route component={Dashboard} path="/dashboard">
      <IndexRoute component={redirect('/dashboard/friend')} />
      <Route component={MyTasks} path="mytasks" />
      <Route component={Friends} path="friend">
        <IndexRoute component={redirect('/dashboard/friend/list')} />
        <Route component={Requests} path="requests" />
        <Route component={FindFriends} path="findfriends" />
        <Route component={FriendList} path="list" />
      </Route>
    </Route>
    <Route component={FriendDetail} path="/detail/:id" />
    <Route component={Login} path="/login" />
    <Route component={Signup} path="/signup" />
    <Route component={Admin} path="/admin" />
  </Route>
)
