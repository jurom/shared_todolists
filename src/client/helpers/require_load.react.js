import React from 'react'
import {Component} from 'vlux'

export function requireLoad(criteriaFn) {

  return (BaseComponent) => {

    class RequireLoad extends Component {

      static displayName = `${BaseComponent}RequireLoad`

      render() {
        return criteriaFn(this.props) && (
          <BaseComponent {...this.props} />
        )
      }
    }
    return RequireLoad
  }
}
