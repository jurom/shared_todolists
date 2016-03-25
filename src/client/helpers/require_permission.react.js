import React from 'react'
import {Component} from 'vlux'

export function requirePermission(criteriaFn) {

  return (BaseComponent) => {

    class RequirePermission extends Component {

      static displayName = `${BaseComponent}RequirePermission`

      render() {
        if (criteriaFn(this.props)) {
          return (
            <BaseComponent {...this.props} />
          )
        } else {
          return (
            <div>Sorry friend, you don't have permission to see this.</div>
          )
        }
      }
    }
    return RequirePermission
  }
}
