import React from 'react'
import {create} from '../actions'
import {dispatcher, dispatch} from '../dispatcher'

export class App extends React.Component {

  static displayName = 'App';

  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.actions = create(dispatch, this.context.router, () => dispatcher.state)

    const changeState = (state) => this.setState(state.toObject())
    dispatcher.on('change', changeState)
    changeState(dispatcher.state)
  }

  render() {

    const props = {...this.state, actions: this.actions}
    return (
      <div>
        {React.cloneElement(this.props.children, props)}
      </div>
    )
  }
}
