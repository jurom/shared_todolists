import React from 'react'
import {Component} from 'vlux'
import {registrationStatus, UNREGISTERED, REGISTERED, BLOCKED} from './registration_status'

function unregToLogin(regStatus, actions) {
  if (regStatus === UNREGISTERED) {
    actions.redirectTo('/login')
    return true
  }
  return false
}

function regToDashboard(regStatus, actions) {
  if (regStatus === REGISTERED) {
    actions.redirectTo('/')
    return true
  }
  return false
}

export function redirectIfNotAuth(regStatus, actions) {
  return unregToLogin(regStatus, actions)
}

export function redirectIfAuth(regStatus, actions) {
  return regToDashboard(regStatus, actions)
}

// For sites accessible only for authenticated users
export function requireAuth(BaseComponent) {
  return requireRegistrationState(BaseComponent, redirectIfNotAuth)
}

// For sites accessible only to unauthenticated users (login, signup)
export function requireUnauth(BaseComponent) {
  return requireRegistrationState(BaseComponent, redirectIfAuth)
}

function requireRegistrationState(BaseComponent, redirectIfNeeded) {

  return class RequireRegistrationState extends Component {

    static displayName = `${BaseComponent.name}RequireRegistrationState`;

    static propTypes = {
      actions: React.PropTypes.object,
      auth: React.PropTypes.object,
      users: React.PropTypes.object,
    };

    redirectIfNeeded(props) {
      const {users, actions: {auth: actions}, auth} = props
      const regStatus = registrationStatus(users, auth)
      // Abort next render if the user is redirected
      this.abortRender = redirectIfNeeded(
        regStatus,
        actions,
      )
    }

    componentWillMount() {
      this.redirectIfNeeded(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.redirectIfNeeded(nextProps)
    }

    render() {
      if (this.abortRender) return null
      const {users, auth} = this.props
      if (registrationStatus(users, auth) === BLOCKED) {
        return <div> Sorry, your account is blocked </div>
      }
      return (
        <BaseComponent {...this.props} />
      )
    }
  }
}
