import React from 'react'

export class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}
