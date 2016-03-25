import React from 'react'
import {Component} from 'vlux'
import {Nav, NavItem, Row, Col} from 'react-bootstrap'
import {fromJS} from 'immutable'
import {requireAuth} from '../auth/require_registration_state.react'
import {requireLoad} from '../helpers/require_load.react'


@requireAuth
@requireLoad((props) => props.friends.get('friendIds') != null)
export class Friends extends Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    friends: React.PropTypes.object.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  renderNav(items) {
    const router = this.context.router
    const absRoute = (route) => `/dashboard/friend/${route}`
    const selectedKey = items
      .map(({route}) => absRoute(route))
      .filter((route) => router.isActive(route))
      .first()
    return (
      <Nav bsStyle="tabs" onSelect={(route) => router.push(route)} activeKey={selectedKey}>
        {items.map(({route, label}) =>
          <NavItem eventKey={absRoute(route)} key={route} >{label}</NavItem>
        )}
      </Nav>
    )
  }

  render() {
    const {...propsNoChildren, children} = this.props
    return (
      <div>
        <Row>
          <Col md={12}>
            {this.renderNav(fromJS([
              {
                route: 'list',
                label: 'My friends',
              },
              {
                route: 'requests',
                label: 'Friend requests',
              },
              {
                route: 'findfriends',
                label: 'Find friends'
              }
            ]))}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {React.cloneElement(this.props.children, propsNoChildren)}
          </Col>
        </Row>
      </div>
    )
  }
}
