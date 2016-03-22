import React from 'react'
import {create} from '../actions'
import {dispatcher, dispatch} from '../dispatcher'
import Firebase from 'firebase'
import {ListenUser} from '../user/listen_user.react'
import {Header} from './header.react'
import {registrationStatus, LOADING} from '../auth/registration_status'
import {Loading} from '../helpers/loading.react'

export class App extends React.Component {

  static displayName = 'App';

  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    // Parse config data from server
    this.config = JSON.parse(document.getElementsByTagName('body')[0].attributes.data.value)
    this.firebase = new Firebase(this.config.firebase)
    this.actions = create(dispatch, this.context.router, this.firebase, () => dispatcher.state)

    const changeState = (state) => this.setState(state.toObject())
    dispatcher.on('change', changeState)
    changeState(dispatcher.state)

    // Handle firebase authentication
    this.firebase.onAuth(this.actions.auth.handleAuth)
  }

  render() {

    const [firebase, actions] = [this.firebase, this.actions]
    const props = {...this.state, actions, firebase, dispatch}

    const {auth: {uid = null}, auth, users} = props
    let user = null
    if (uid != null) user = users.get(uid)

    const regStatus = registrationStatus(users, auth)

    const isReady = (regStatus !== LOADING)
    return (
      <div>
        {uid && <ListenUser {...{firebase, dispatch, uid}} />}
        <Loading isReady={isReady}>
          <Header {...{users, auth, actions, user}} />
          {React.cloneElement(this.props.children, {...props, user})}
        </Loading>
      </div>
    )
  }
}
