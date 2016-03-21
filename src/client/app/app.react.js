import React from 'react'
import {create} from '../actions'
import {dispatcher, dispatch} from '../dispatcher'
import Firebase from 'firebase'

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

    const props = {...this.state, actions: this.actions, dispatch}
    return (
      <div>
        {React.cloneElement(this.props.children, props)}
      </div>
    )
  }
}
