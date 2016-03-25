import React from 'react'
import {create} from '../actions'
import {dispatcher, dispatch} from '../dispatcher'
import Firebase from 'firebase'
import {ListenUsers} from '../user/listen_user.react'
import {Header} from './header.react'
import {registrationStatus, LOADING} from '../auth/registration_status'
import {Loading} from '../helpers/loading.react'
import {Settings} from '../settings/settings.react'
import {read} from '../../common/firebase_actions'
import {getUserIdsToListen} from '../user/helpers'
import {getClient} from '../../firebase-transactions/src/client'
import {ListenFriends} from '../friend/listen_friends.react'

export class App extends React.Component {

  static displayName = 'App';

  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  logoutIfDeleted() {
    const data = this.firebase.getAuth()
    if (data) {
      // If user's profile does not exist => user was deleted
      return read(this.firebase.child(`user/profile/${data.uid}`))
        .then((data) => data || this.actions.auth.logout())
    }
  }

  componentWillMount() {
    // Parse config data from server
    this.config = JSON.parse(document.getElementsByTagName('body')[0].attributes.data.value)
    this.firebase = new Firebase(this.config.firebase)
    this.submitTransaction =
      getClient(this.firebase, {todoTrxRef: this.firebase.child('new_transaction')})

    this.actions =
      create(dispatch, this.context.router, this.firebase, () => dispatcher.state, this.submitTransaction)

    const changeState = (state) => this.setState(state.toObject())
    dispatcher.on('change', changeState)
    changeState(dispatcher.state)

    // If the user does not exist, log him out (should happen only in development)
    this.logoutIfDeleted()
    // Handle firebase authentication
    this.firebase.onAuth(this.actions.auth.handleAuth)
  }

  render() {

    const [firebase, actions] = [this.firebase, this.actions]
    const props = {...this.state, actions, firebase, dispatch}

    const {auth: {uid = null}, auth, users} = props
    let user = null
    if (uid != null) user = users.get(uid)

    const ids = getUserIdsToListen(this.state)
    const regStatus = registrationStatus(users, auth)

    const isReady = (regStatus !== LOADING)
    return (
      <div>
        <ListenUsers {...{firebase, dispatch, ids}} />
        {uid && <ListenFriends {...{firebase, dispatch, uid}} />}
        <Loading isReady={isReady}>
          <Header {...{users, auth, actions, user, dispatch}} />
          <Settings {...{...props, user}} />
          {React.cloneElement(this.props.children, {...props, user})}
        </Loading>
      </div>
    )
  }
}
