import React from 'react'
import {Component} from 'vlux'

export class Loading extends Component {

  static propTypes = {
    isReady: React.PropTypes.bool.isRequired,
    children: React.PropTypes.any.isRequired,
  }

  render() {
    const {isReady} = this.props
    if (isReady) return <div>{this.props.children}</div>
    return (
      <div>Loading, please wait..</div>
    )
  }
}
