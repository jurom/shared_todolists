import React from 'react'
import {Component} from 'vlux'
import {requireAuth} from '../auth/require_registration_state.react'

@requireAuth
export class Dashboard extends Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    dashboard: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.actions.dashboard.test('yes')
  }

  render() {
    const {dashboard: {res}} = this.props
    return (
      <div>{`Is flux architecture ok? ${res}`}</div>
    )
  }
}
