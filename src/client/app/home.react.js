import React from 'react'
import {Component} from 'vlux'

// Only for redirecting from index route to dashboard
export class Home extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    // Redirect to dashboard
    this.context.router.push('/dashboard')
  }

  render() {
    return null
  }
}
