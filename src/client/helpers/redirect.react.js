import React from 'react'
import {Component} from 'vlux'

export function redirect(route) {
  return class Redirect extends Component {

      static displayName = `Redirect`

      static contextTypes = {
        router: React.PropTypes.object.isRequired
      }

      componentWillMount() {
        this.context.router.replace(route)
      }

      render() {
        return null
      }
    }
}
